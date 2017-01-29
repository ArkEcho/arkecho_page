var mainApp = angular.module('mainApp', ['ngRoute']);

// Routing
mainApp.config(function($routeProvider)
{
  $routeProvider
    .when('/',
      {
        controller: 'HomeController',
        templateUrl: 'views/viewHome.html'
      })
    .when('/contact',
      {
        controller: 'ContactController',
        templateUrl: 'views/viewContact.html'
      })
    .when('/about',
      {
        controller: 'AboutController',
        templateUrl: 'views/viewAbout.html'
      })
    .otherwise({redirectTo: '/'});
});

// Controller Definition
var controllers = {};

controllers.HomeController = function($scope)
{
};

controllers.ContactController = function($scope)
{
};

controllers.AboutController = function($scope)
{
};

controllers.NavigationController = function ($scope)
{
  $scope.testMessage = 'TEST NACHRICHT TEST';
  var active = 'navigationActive';
  init(); // Aufrufen der Initialisierungs Funktion des Navigation Controllers

  function init()
  {
    clearVars();
    $scope.varHomeLinkClass = active; // Home ist default Startseite
  }

  function clearVars()
  {
    $scope.varHomeLinkClass = '';
    $scope.varContactLinkClass = '';
    $scope.varAboutLinkClass = '';
  }

  $scope.home = function()
  {
    clearVars();
    $scope.varHomeLinkClass = active;
  }

  $scope.contact = function()
  {
    clearVars();
    $scope.varContactLinkClass = active;
  }

  $scope.about = function()
  {
    clearVars();
    $scope.varAboutLinkClass = active;
  }
};

mainApp.controller(controllers);
