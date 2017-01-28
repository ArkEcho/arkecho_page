var mainApp = angular.module('mainApp', []);

// Controller Definition
var controllers = {};
controllers.MainController = function ($scope)
{
  $scope.testMessage = 'TEST NACHRICHT TEST';
};

mainApp.controller(controllers);
