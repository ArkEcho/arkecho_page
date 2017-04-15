var mainApp = angular.module('mainApp', ['ngRoute']);

// Routing
mainApp.config(function($routeProvider)
{
    $routeProvider
        .when('/',
        {
            controller: 'SonglistController',
            templateUrl: 'views/viewSonglist.html'
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
