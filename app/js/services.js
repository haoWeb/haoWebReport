'use stack';
var haoWebServices = angular.module('haoWebServices', ['ngResource']);

haoWebServices.factory('repMenuSrv', ['$http',
    function ($http) {
        var menuSrv = {};
        var menuUrl = 'data/menu.json';
        menuSrv.getMenus = function () {
            return $http.get(menuUrl).success(function (data) {
                return data.data;
            });
        }
        return menuSrv
    }]);

haoWebServices.factory('repDataSrv', ['$resource',
    function ($resource) {
        return $resource('data/:repName.json', {}, {
            getCustAnalysisOne: {method: 'GET', params: {repName: 'custAnalysisOne'}, isArray: true},
            getCustAnalysisTwo: {method: 'GET', params: {repName: 'custAnalysisTwo'}, isArray: true},
            getCustAnalysisThree: {method: 'GET', params: {repName: 'custAnalysisThree'}, isArray: true},
            getUsers: {method: 'GET', params: {repName: 'users'}, isArray: true}
        });
    }]);

haoWebServices.factory('repWebSrv', ['$q', '$resource', '$rootScope',
    function ($q, $resource, $rootScope) {
        var webSrv = {};
        var url = '../WebSrv.asmx/';
        var params = {};
        webSrv.getCustAnalysisOne = function (repUser) {
            params.repName = 'CustAnalysis1';
            params.repUser = repUser;
            return $resource(url + ':functionName', {
                functionName: 'RepGetData',
                sessionID: $rootScope.$stateParams.sessionID,
                jsonParameter: JSON.stringify(params)
            });
        };
        webSrv.getCustAnalysisTwo = function (repUser) {
            params.repName = 'CustAnalysis2';
            params.repUser = repUser;
            return $resource(url + ':functionName', {
                functionName: 'RepGetData',
                sessionID: $rootScope.$stateParams.sessionID,
                jsonParameter: JSON.stringify(params)
            });
        };
        webSrv.getCustAnalysisThree = function (repUser, repColName) {
            params.repName = 'CustAnalysis3';
            params.repUser = repUser;
            params.repColName = repColName;
            return $resource(url + ':functionName', {
                functionName: 'RepGetData',
                sessionID: $rootScope.$stateParams.sessionID,
                jsonParameter: JSON.stringify(params)
            });
        };
        webSrv.getCustColList = function () {
            params.repName = 'CustColList';
            params.repUser = '';
            return $resource(url + ':functionName', {
                functionName: 'RepGetData',
                sessionID: $rootScope.$stateParams.sessionID,
                jsonParameter: JSON.stringify(params)
            });
        };

        webSrv.userList = [];
        webSrv.getUserList = function () {

            if (webSrv.userList.length > 0) {
                return $q.when(webSrv.userList);
            }
            params.repName = 'UserList';
            params.repUser = '';
            var deferred = $q.defer();
            $resource(url + ':functionName', {
                functionName: 'RepGetData',
                sessionID: $rootScope.$stateParams.sessionID,
                jsonParameter: JSON.stringify(params)
            }).get(function (data) {
                webSrv.userList = data.table;
                deferred.resolve(webSrv.userList);
             });
            return deferred.promise;
        }
        return webSrv;
    }])
;

haoWebServices.service('repCommonSrv', ['$filter',
    function ($filter) {
        var userSelect = [];
        var findUser = function (userList, userParent) {
            var user = $filter('filter')(userList, function (value) {
                return (value.item_parent == userParent);
            });

            if (user.length > 0) {
                for (var i = 0, len = user.length; i < len; i++) {
                    var msGroup = user[i].type1_type == 'B30';
                    if (msGroup) {
                        userSelect.push({
                            "id": user[i].item_id,
                            "name": "<strong>" + user[i].item_name + "</strong>",
                            "msGroup": msGroup
                        });
                        findUser(userList, user[i].item_id)
                    }
                    else {
                        userSelect.push({
                            "id": user[i].item_id,
                            "name": user[i].item_name,
                            "maker": '',
                            "ticked": false
                        });
                    }
                }
                userSelect.push({
                    "msGroup": false
                });
            }
            else {
                userSelect.pop();
            }

        };
        this.generateMslineCharData = function (result) {
            var category = [];
            var dataset = [];
            var objLabel = {};
            var objData = {};
            var labelId = 0
            var dataId = 0;
            for (var i = 0; i < result.length; i++) {
                var itemId = result[i].item_id;
                var itemName = result[i].item_name;
                var itemUser = result[i].item_user;
                var itemUserName = result[i].item_username;
                var itemCount = result[i].item_count;

                if (objLabel[itemId] == undefined) {
                    objLabel[itemId] = labelId;
                    labelId++;
                    category.push({
                        "label": itemName
                    });
                }

                if (objData[itemUser] == undefined) {
                    objData[itemUser] = dataId;
                    dataId++;
                    dataset.push({
                        "seriesname": itemUserName,
                        "data": []
                    })

                }

                dataset[objData[itemUser]].data[objLabel[itemId]] = {
                    "value": itemCount
                };
            }
            return {
                "categories": [
                    {
                        "category": category
                    }
                ],
                "dataset": dataset
            }
        };
        this.generate2DCharData = function (result) {
            var data = [];
            for (var i = 0; i < result.length; i++) {
                var item = result[i];
                data.push({
                    "label": item.item_name,
                    "value": item.item_count
                });
            }
            return {
                "data": data
            }
        };
        this.generateUserList = function (userList) {
            findUser(userList, '');
            return userSelect;
        }
    }
]);