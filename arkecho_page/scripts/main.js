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

controllers.ConnectionController = function($scope)
{
  /*
  enum MESSAGETYPE
  {
      MT_NOTDEFINED = 0,
      MT_ECHO_TEST = 1,
      MT_PLAY_PAUSE = 2,
      MT_BACKWARD = 3,
      MT_FORWARD = 4,
      MT_REQUEST_SONG_ACTUAL = 5,
      MT_SEND_SONG_ACTUAL = 6
  }
  */

  var webSocket_;
  var webSocketOpen_ = false;

  openConnection('192.168.0.59:1000');
  //sendMessage('2', '');

  function openConnection(address)
  {
    webSocket_ = new WebSocket('ws://' + address);
  }

  function closeConnection()
  {
    webSocket_.close();
  }

  function sendMessage(type, message)
  {
    var json = '{ "Typ": ' + type + ', "Message": "' + message + '" }';
    webSocket_.send(json);
  }
  /*
  webSocket.onopen = function (evt) {
    //alert("Connected..");
  }

  webSocket.onclose = function (evt) {
    //alert("Disconnected...");
  }

  webSocket.onmessage = function (evt) {
    var json = JSON.parse(evt.data);
    var type = json.Typ;
    var message = json.Message;
    //alert(out);
  }

  webSocket.onerror = function (evt) {
    alert("Error...");
  }
  */
};

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
