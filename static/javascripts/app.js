angular.module('idrettsanlegg.controllers', []);
angular.module('idrettsanlegg.filters', []);
angular.module('idrettsanlegg.services', []);
angular.module('idrettsanlegg.directives', []);

angular
    .module('idrettsanlegg', [
        'ui.router',
        'ngResource',
        'ui.bootstrap',
        'ngAnimate',
        'uiGmapgoogle-maps',
        'idrettsanlegg.directives',
        'idrettsanlegg.controllers',
        'idrettsanlegg.services',
        'idrettsanlegg.filters'
    ])
    .config(function ($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: ''
        });

        $urlRouterProvider.when("", "/home/map");
        $urlRouterProvider.when("/", "/home/map");
        $urlRouterProvider.otherwise("/home/map");

          //
          // Now set up the states
        $stateProvider
            .state('home', {
                abstract: true,
                url: "/home",
                templateUrl: "static/templates/main.html",
                controller: 'HomeController'
            })
            .state('home.table', {
                url: "/table",
                templateUrl: "static/templates/table.html",
            })
            .state('home.map', {
                url: "/map",
                templateUrl: "static/templates/map.html",
                controller: 'MapController'
            });
    });
