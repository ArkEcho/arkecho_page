var mainApp = angular.module('mainApp', ['ngRoute']);

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

controllers.NavigationController = function ($scope)
{
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

  $scope.homeLinkClicked = function()
  {
    clearVars();
    $scope.varHomeLinkClass = active;
  }

  $scope.contactLinkClicked = function()
  {
    clearVars();
    $scope.varContactLinkClass = active;
  }

  $scope.aboutLinkClicked = function()
  {
    clearVars();
    $scope.varAboutLinkClass = active;
  }
};

mainApp.controller(controllers);
