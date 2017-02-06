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

// Controller Definition
var controllers = {};

controllers.ConnectionController = function($scope, $route)
{   
    var webSocket_;
    var open_ = false;
    var hide = 'hiddenImage';
    var defaultText = '<Kein Titel gestartet>';

    // Init
    init();
    function init() {
        $scope.songTitle = defaultText;
        $scope.songInterpret = defaultText;
        $scope.albumTitle = defaultText;
        $scope.albumInterpret = defaultText;
        setDefaultImage();
    }
    //

    $scope.connectClicked = function ()
    {
        var address = prompt('Bitte die Adresse des ArkEcho-Players eingeben!');
        if(address != '') openConnection(address);
    }
    $scope.rewindClicked = function(){sendMessage(3, '');}
    $scope.playPauseClicked = function(){sendMessage(2, '');}
    $scope.forwardClicked = function () {sendMessage(4, '');}

    function openConnection(address)
    {
        webSocket_ = new WebSocket('ws://' + address);

        webSocket_.onopen = function (evt) {
            open_ = true;
            sendMessage('5', '');
        }

        webSocket_.onclose = function (evt) {
            open_ = false;
            alert('Verbindung zum ArkEcho Player unterbrochen!');
        }

        webSocket_.onmessage = function (evt) {
            var json = JSON.parse(evt.data);
            var type = json.Type;
            var message = json.Message;
            if (type == 6) {
                var song = JSON.parse(message);
                $scope.songTitle = song.SongTitle;
                $scope.songInterpret = song.SongInterpret;
                $scope.albumTitle = song.AlbumTitle;
                $scope.albumInterpret = song.AlbumInterpret;
                $scope.coverArt = song.CoverArt;
                setCoverArtImage();
            }
            $route.reload()
        }

        webSocket_.onerror = function (evt) {
            open_ = false;
        }
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

    // Setzen des anzuzeigenden Bildes
    function setDefaultImage(){
        $scope.varDefaultImage = '';
        $scope.varCoverArtImage = hide;
    }
    function setCoverArtImage(){
        $scope.varDefaultImage = hide;
        $scope.varCoverArtImage = '';
    }
    //
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

    $scope.homeViewOpened = function ()
    {
        clearVars();
        $scope.varHomeLinkClass = active;
    }

    $scope.contactViewOpened = function ()
    {
        clearVars();
        $scope.varContactLinkClass = active;
    }

    $scope.aboutViewOpened = function ()
    {
        clearVars();
        $scope.varAboutLinkClass = active;
    }
};

mainApp.controller(controllers);