/**
 * Created by dyx on 2015/7/28.
 */
var haoWebControllers = angular.module('haoWebControllers', []);
haoWebControllers.controller('repListCtrl', ['$scope', 'repMenuSrv',
    function ($scope, repMenuSrv) {
        repMenuSrv.getMenus().then(function (menu) {
            $scope.menuItems = menu.data;
        })
    }
]);

haoWebControllers.controller('repDetailCtrl', ['$scope',
    function ($scope) {
        $scope.data = 'detail';
    }]);

haoWebControllers.controller('repCustAnalysis1Ctrl', ['$scope', 'i18nService', 'repCommonSrv', 'repWebSrv',
    function ($scope, i18nService, repCommonSrv, repWebSrv) {
        i18nService.setCurrentLang('zh-cn');
        $scope.myDataSource = {};
        $scope.gridOptions = {};
        $scope.retrieve = function () {
            repWebSrv.getCustAnalysisOne($scope.user.item_id).get(function (data) {
                var result = data.table;
                var obj = repCommonSrv.generateMslineCharData(result);

                $scope.myDataSource = {
                    "chart": {
                        "caption": "客户数量统计",
                        "subcaption": "按客户本",
                        "plotgradientcolor": "",
                        "bgcolor": "FFFFFF",
                        "showalternatehgridcolor": "0",
                        "divlinecolor": "CCCCCC",
                        "showvalues": "0",
                        "showcanvasborder": "0",
                        "canvasborderalpha": "0",
                        "canvasbordercolor": "CCCCCC",
                        "canvasborderthickness": "1",
                        "captionpadding": "30",
                        "linethickness": "3",
                        "yaxisvaluespadding": "15",
                        "legendshadow": "0",
                        "legendborderalpha": "0",
                        "palettecolors": "#f8bd19,#008ee4,#33bdda,#e44a00,#6baa01,#583e78",
                        "showborder": "0"
                    },
                    "categories": obj.categories,
                    "dataset": obj.dataset
                };
                $scope.gridOptions = {
                    enableSorting: false,
                    columnDefs: [
                        {name: '客户本', field: 'item_name'},
                        {name: '数量', field: 'item_count'}
                    ],
                    data: result
                };
            })
        }
    }
]);

haoWebControllers.controller('repCustAnalysis2Ctrl', ['$scope', 'repWebSrv', 'repCommonSrv',
    function ($scope, repWebSrv, repCommonSrv) {
        $scope.myDataSource = {};
        $scope.retrieve = function () {
            repWebSrv.getCustAnalysisTwo($scope.user.item_id).get(function (data) {
                var result = data.table;
                var obj = repCommonSrv.generate2DCharData(result);

                $scope.myDataSource = {
                    "chart": {
                        "caption": "按标签统计客户数量",
                        "subCaption": "前十笔记录",
                        "theme": "fint",
                        "usePlotGradientColor": "1"
                    },
                    data: obj.data
                };
            })
        };
    }
]);

haoWebControllers.controller('repCustAnalysis3Ctrl', ['$scope', 'repWebSrv', 'repCommonSrv',
    function ($scope, repWebSrv, repCommonSrv) {
        $scope.myDataSource = {};
        $scope.retrieve = function () {
            var repUser = $scope.user.item_id;
            var repColName = $scope.custCol.typecol_column;
            repWebSrv.getCustAnalysisThree(repUser, repColName).get(function (data) {
                var result = data.table;
                var obj = repCommonSrv.generateMslineCharData(result);
                $scope.myDataSource = {
                    "chart": {
                        "caption": "客户数量统计",
                        "subcaption": "按自定义字段",
                        "linethickness": "1",
                        "showvalues": "0",
                        "formatnumberscale": "0",
                        "anchorradius": "2",
                        "divlinecolor": "666666",
                        "divlinealpha": "30",
                        "divlineisdashed": "1",
                        "bgcolor": "FFFFFF",
                        "showalternatehgridcolor": "0",
                        "labelpadding": "10",
                        "canvasborderthickness": "1",
                        "legendiconscale": "1.5",
                        "legendshadow": "0",
                        "legendborderalpha": "0",
                        "legendposition": "right",
                        "canvasborderalpha": "50",
                        "numvdivlines": "5",
                        "vdivlinealpha": "20",
                        "showborder": "0"
                    },
                    "categories": obj.categories,
                    "dataset": obj.dataset
                };
            });
        };
    }
]);