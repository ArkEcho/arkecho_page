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
