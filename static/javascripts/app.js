
angular
    .module('idrettsanlegg', [
        'ngRoute',
        'ngResource',
        'ui.bootstrap',
        'ngAnimate'
    ])
    .config(function ($routeProvider, $locationProvider) {
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
    .controller('MainController', function($scope, Construction) {
        Construction.query(function(data) {
            //$scope.constructions = data.objects etc.
            console.log(data);
        });
        $scope.constructions = ['1', '2', '3'];

        // Datepickers
        $scope.callers = [];
        $scope.fromDate = new Date();
        $scope.toDate = new Date();

        $scope.dateOpts = {
            datepickerMode: "year",
            minMode:"year",
            showWeeks:"false"
        };

        $scope.today = function () {
            $scope.fromDate = new Date();
        };

        $scope.clear = function () {
            $scope.fromDate = null;
        };

        $scope.openDate = function($event, caller) {
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
        return $resource('http://127.0.0.1:8000/api/v1/Idrettsanlegg/?format=json', { id: '@_id' }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET'
            }
        });
    });
