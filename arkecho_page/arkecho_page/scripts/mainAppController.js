// Controller Definition
var controllers = {};

controllers.ConnectionController = function($scope)
{
    /*enum MESSAGETYPE
    {
        MT_NOTDEFINED = 0,
        MT_ECHO_TEST = 1,
        MT_PLAY_PAUSE = 2,
        MT_BACKWARD = 3,
        MT_FORWARD = 4,
        MT_REQUEST_SONG_ACTUAL = 5,
        MT_SEND_SONG_ACTUAL = 6
    }*/
    
    var webSocket_ = new WebSocket('ws://0');
    var open_ = false;

    $scope.connectClicked = function()
    {
        var address = prompt('Bitte die Adresse des ArkEcho-Players eingeben!');
        if(address != '')
        {
            openConnection(address);
        }
    }

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
        if(open_ == false) return;
        var json = '{ "Type": ' + type + ', "Message": "' + message + '" }';
        webSocket_.send(json);
    }

    webSocket_.onopen = function (evt) {
        //alert("Connected..");
        open_ = true;
        sendMessage('5', '');
        changeStatusColor();
    }

    webSocket_.onclose = function (evt) {
        //alert("Disconnected...");
        open_ = false;
        changeStatusColor();
    }

    webSocket_.onmessage = function (evt) {
        var json = JSON.parse(evt.data);
        var type = json.Type;
        var message = json.Message;
        if(type == 6)
        {
            var song = JSON.parse(message);
            //alert(song.SongInterpret + song.SongTitle);
        }
    }

    webSocket_.onerror = function (evt) {
        //alert("Error...");
        open_ = false;
        changeStatusColor();
    }
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
