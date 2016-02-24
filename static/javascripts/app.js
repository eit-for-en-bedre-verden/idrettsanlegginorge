
angular
  .module('idrettsanlegg', [
    'ngRoute',
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider
      .html5Mode(true)
      .hashPrefix('!');
    $routeProvider
      .when('/', {
        templateUrl: 'static/templates/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
