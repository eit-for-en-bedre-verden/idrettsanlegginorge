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

        $urlRouterProvider.when("", "/home/table");
        $urlRouterProvider.when("/", "/home/table");
        $urlRouterProvider.otherwise("/home/table");

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
                url: "/table?page",
                templateUrl: "static/templates/table.html",
                controller: 'TableController'
            })
            .state('home.map', {
                url: "/map",
                templateUrl: "static/templates/map.html",
                controller: 'MapController'
            })
            .state('home.construction', {
                url: '/construction/:id',
                templateUrl: 'static/templates/construction.html',
                controller: 'ConstructionController'
            });
    })
    .run(function($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            $rootScope.route = toState.name.split('.')[1] === 'map' ? 1 : 0;
        });
    })
    .value('apiUrl', 'http://127.0.0.1:8000/api/v1/')
    .value('Counties',
        ["Østfold", "Akershus", "Oslo", "Hedmark",
            "Oppland", "Buskerud", "Vestfold", "Telemark", "Aust-Agder",
            "Vest-Agder", "Rogaland", "Hordaland","Sogn og Fjordane",
            "Møre og Romsdal", "Sør-Trøndelag", "Nord-Trøndelag", "Nordland",
            "Troms", "Finnmark"])
    .value('queryMapping', {
        county: 'kommune__fylke__name',
        municipality: 'kommune__name',
        constructionType: 'anleggstype__type',
        constructionYearFrom: 'byggeaar__gt',
        constructionYearTo: 'byggeaar__lt',
        fundsFrom: 'tildelt__gt',
        fundsTo: 'tildelt__lt',
        areaFrom: 'areal__gt',
        areaTo: 'areal__lt'
    });
