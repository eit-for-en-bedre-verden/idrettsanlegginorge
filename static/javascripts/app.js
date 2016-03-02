angular
    .module('idrettsanlegg', [
        'ngRoute',
        'ngResource',
        'ui.bootstrap',
        'ngAnimate',
        'uiGmapgoogle-maps'
    ])
    .config(function ($routeProvider, $locationProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: ''
        });

        $locationProvider
            .html5Mode(true)
            .hashPrefix('!');
        $routeProvider
            .when('/', {
                controller: 'MainController',
                templateUrl: 'static/templates/main.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    // This is the controller for the main route,
    // the scope controls what is visible in the template
    .controller('MainController', function ($scope, Construction, uiGmapGoogleMapApi) {
        Construction.query(function (data) {
            //$scope.constructions = data.objects etc.
            console.log(data);
        });

        $scope.map = {center: {latitude: 63.4, longitude: 10.29}, zoom: 6};
        uiGmapGoogleMapApi.then(function (maps) {
            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
        });

        $scope.constructions = ['1', '2', '3'];

        // Datepickers
        $scope.callers = [];
        $scope.fromDate = new Date();
        $scope.toDate = new Date();

        $scope.dateOpts = {
            datepickerMode: "year",
            minMode: "year",
            showWeeks: "false"
        };

        $scope.today = function () {
            $scope.fromDate = new Date();
        };

        $scope.clear = function () {
            $scope.fromDate = null;
        };

        $scope.openDate = function ($event, caller) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.callers['from'] = false;
            $scope.callers['to'] = false;

            $scope.callers[caller] = true;
        };

    })
    // Interface with the REST API, inject Construction and use
    // .query, .get, .delete etc.
    .factory('Construction', function ($resource) {
        return $resource('http://127.0.0.1:8000/api/v1/Idrettsanlegg/?format=json', {id: '@_id'}, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET'
            }
        });
    });
