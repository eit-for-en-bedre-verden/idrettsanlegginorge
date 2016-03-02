
angular
  .module('idrettsanlegg', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap'
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
