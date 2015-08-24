/**
 * Created by 英学 on 2015/7/31.
 */
var haoWebDirectives = angular.module('haoWebDirectives', []);

haoWebDirectives.directive('haoWebUsers', ['repWebSrv', 'repCommonSrv', function (repWebSrv, repCommonSrv) {
    return {
        "restrict": "EA",
        "templateUrl": "tpls/dirHaoUsers.html",
        "transclude": true,
        "scope": {
            "user": '='
        },
        "link": function (scope) {
            scope.userList = [];
            scope.user = {
                "item_id": ''
            };
            repWebSrv.getUserList().then(function (data) {
                scope.userList = repCommonSrv.generateUserList(data);
            });

            scope.$watch('outUser', function () {
                scope.user.item_id = '';
                if (scope.outUser == null) return;
                angular.forEach(scope.outUser, function (value) {
                    if (value.id == undefined) return;
                    scope.user.item_id += value.id + ',';
                })
            });
        }
    }
}]);

haoWebDirectives.directive('haoWebCustCol', ['repWebSrv', function (repWebSrv) {
    return {
        "restrict": "EA",
        "templateUrl": "tpls/dirHaoCustCol.html",
        "transclude": true,
        "scope": {
            "custCol": '='
        },
        "link": function (scope) {
            repWebSrv.getCustColList().get(function (data) {
                scope.custColList = data.table;
            });
        }
    }
}]);
