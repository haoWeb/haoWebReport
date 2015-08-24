/**
 * Created by dyx on 2015/7/28.
 */
'use stack';
haoWeb = angular.module('haoWebApp', [
    'ngResource',
    'ngAnimate',
    'ng-fusioncharts',
    'ui.router',
    'ui.grid',
    'isteven-multi-select',
    'haoWebControllers',
    'haoWebServices',
    'haoWebDirectives'
]);

haoWeb.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

haoWeb.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/report');
            $stateProvider.
                state('home', {
                    url: '/report/:sessionID',
                    views: {
                        '': {
                            templateUrl: 'tpls/home.html'
                        },
                        'repList@home': {
                            templateUrl: 'tpls/repList.html',
                            controller: 'repListCtrl'
                        }
                    }
                }).
                state('home.root', {
                    url: '/{repId:[0-9]{1,4}}',
                    templateUrl: 'tpls/repDetail.html'
                }).
                state('home.repCustAnalysisOne', {
                    url: '/repCustAnalysisOne',
                    templateUrl: 'tpls/repCustAnalysis1.html'
                }).
                state('home.repCustAnalysisTwo', {
                    url: '/repCustAnalysisTwo',
                    templateUrl: 'tpls/repCustAnalysis2.html'
                }).
                state('home.repCustAnalysisThree', {
                    url: '/repCustAnalysisThree',
                    templateUrl: 'tpls/repCustAnalysis3.html'
                })

        }]
);