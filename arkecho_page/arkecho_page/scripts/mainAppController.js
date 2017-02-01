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
    /* Refresh Timer to show the Actual Song Info after Receive */
    setInterval(function () {
        $scope.songTitle = actualSongInfo_.songTitle
        $scope.songInterpret = actualSongInfo_.songInterpret;
        $scope.albumTitle = actualSongInfo_.albumTitle;
        $scope.albumInterpret = actualSongInfo_.albumInterpret;
        //document.getElementById('coverArt').setAttribute('src', 'data:image/png;base64,' + actualSongInfo_.coverArt);
        $route.reload()
    }, 1000);
    
    var webSocket_;
    var open_ = false;
    var actualSongInfo_ = { songTitle:'', songInterpret:'', albumTitle:'', albumInterpret:'', coverArt:'' };

    $scope.connectClicked = function()
    {
        var address = prompt('Bitte die Adresse des ArkEcho-Players eingeben!');
        if(address != '') openConnection(address);
    }

    function openConnection(address)
    {
        webSocket_ = new WebSocket('ws://' + address);

        webSocket_.onopen = function (evt) {
            open_ = true;
            sendMessage('5', '');
        }

        webSocket_.onclose = function (evt) {
            open_ = false;
        }

        webSocket_.onmessage = function (evt) {
            var json = JSON.parse(evt.data);
            var type = json.Type;
            var message = json.Message;
            if (type == 6) {
                var song = JSON.parse(message);
                actualSongInfo_.songTitle = song.SongTitle;
                actualSongInfo_.songInterpret = song.SongInterpret;
                actualSongInfo_.albumTitle = song.AlbumTitle;
                actualSongInfo_.albumInterpret = song.AlbumInterpret;
                actualSongInfo_.coverArt = song.CoverArt;
            }
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
