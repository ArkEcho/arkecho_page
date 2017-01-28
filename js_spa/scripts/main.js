var mainApp = angular.module('mainApp', []);

// Routing
mainApp.config(function($routeProvider)
{
  $routeProvider
    .when('/',
      {
        controller: 'MainController',
        templateUrl: 'views/viewHome.html'
      })
    .when('/contact',
      {
        controller: 'MainController',
        templateUrl: 'views/viewContact.html'
      })
    .when('/about',
      {
        controller: 'MainController',
        templateUrl: 'views/viewAbout.html'
      })
    .otherwise({redirectTo: '/'});
});

// Controller Definition
var controllers = {};
controllers.MainController = function ($scope)
{
  $scope.testMessage = 'TEST NACHRICHT TEST';
};

mainApp.controller(controllers);
