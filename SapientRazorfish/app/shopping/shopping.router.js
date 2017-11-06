(function () {
    'use strict';

    var app = angular
        .module('app.shoppingConfiguration', ['ui.router', 'uiRouterStyles']);

    app.config(configRoute);

    app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    configRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configRoute($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/shoppingConfig');

        $stateProvider
            .state('shoppingConfig', {
                url: '/shoppingConfig',
                templateUrl: 'app/shopping/shopping.html'
            })
            .state('shoppingConfig.shoppingView', {
                url: '/shoppingView',
                views: {
                    "shoppingView": { templateUrl: 'app/shopping/partial-layout/shopping-view.html', }
                },
                data: {
                    css: 'app/shopping/shopping.css'
                }
            });
    }

})();
