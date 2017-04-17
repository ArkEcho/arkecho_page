// Mesagetype Definition
var Messagetype = {};

Messagetype.MT_NOTDEFINED = 0;
Messagetype.MT_ECHO_TEST = 1;
Messagetype.MT_PLAY_PAUSE = 2;
Messagetype.MT_BACKWARD = 3;
Messagetype.MT_FORWARD = 4;
Messagetype.MT_REQUEST_SONG_ACTUAL = 5;
Messagetype.MT_SEND_SONG_ACTUAL = 6;
Messagetype.MT_REQUEST_SONGLIST = 7;
Messagetype.MT_SEND_SONGLIST = 8;
Messagetype.MT_SHUFFLE = 9;
Messagetype.MT_STOP = 10;
Messagetype.MT_VOLUME_VALUE = 11;

// Controller Definition
var controllers = {};

controllers.ConnectionController = function($scope, $route, $rootScope)
{   
    var webSocket_;
    var open_ = false;
    var defaultText = '<Kein Titel gestartet>';
    var defaultCover = './resources/player/defaultMusicIcon.png';
    var convertBase64Prefix = 'data:image/png;base64,';

    // Init
    init();
    function init() {
        $scope.songTitle = defaultText;
        $scope.songInterpret = defaultText;
        $scope.albumTitle = defaultText;
        $scope.albumInterpret = defaultText;
        $scope.albumCover = defaultCover;
        disconnected();
    }

    $scope.connectClicked = function (){
        var address = prompt('Bitte die Adresse des ArkEcho-Players eingeben!', 'localhost:1000');
        if(address != '' && address !== null) openConnection(address);
    }
    
    $rootScope.$on("SendMessage", function(event, args){
        sendMessage(args.type, args.msg);
    });

    // Set WebSocket and implement Events
    function openConnection(address){
        webSocket_ = new WebSocket('ws://' + address);

        webSocket_.onopen = function (evt) {
            open_ = true;
            connected();
            sendMessage(Messagetype.MT_REQUEST_SONG_ACTUAL, '');
            sendMessage(Messagetype.MT_REQUEST_SONGLIST, '');
        }

        webSocket_.onclose = function (evt) {
            open_ = false;
            disconnected();
            $route.reload()
        }

        webSocket_.onmessage = function (evt) {
            var json = JSON.parse(evt.data);
            var type = json.Type;
            var message = json.Message;
            if (type == Messagetype.MT_SEND_SONG_ACTUAL) {
                var song = JSON.parse(message);
                $scope.songTitle = song.SongTitle;
                $scope.songInterpret = song.SongInterpret;
                $scope.albumTitle = song.AlbumTitle;
                $scope.albumInterpret = song.AlbumInterpret;
                $scope.albumCover = convertBase64Prefix + song.CoverArt;
            }
            else if(type == Messagetype.MT_SEND_SONGLIST){
                var songlist = JSON.parse(message);
                $scope.songList = songlist.SongList;
            }
            $route.reload()
        }

        webSocket_.onerror = function (evt) {
            open_ = false;
        }
    }

    function sendMessage(type, message)    {
        if(open_ == false) return;
        var json = '{ "Type": ' + type + ', "Message": "' + message + '" }';
        webSocket_.send(json);
    }

    function connected(){
        $scope.connectionStatusClass = 'connected';
    }
    function disconnected(){
        $scope.connectionStatusClass = 'disconnected';
    }
};

controllers.PlayerController = function($scope, $rootScope){
    // Needed to access ng-model Data
    $scope.inputData = { sliderVol: 100 };

    $scope.rewindClicked = function(){
        $rootScope.$emit("SendMessage",{type: Messagetype.MT_BACKWARD, msg: ''});
    }
    $scope.playPauseClicked = function(){
        $rootScope.$emit("SendMessage",{type: Messagetype.MT_PLAY_PAUSE, msg: ''});
    }
    $scope.forwardClicked = function () {
        $rootScope.$emit("SendMessage",{type: Messagetype.MT_FORWARD, msg: ''});
    }
    $scope.shuffleClicked = function () {
        $rootScope.$emit("SendMessage",{type: Messagetype.MT_SHUFFLE, msg: ''});
    }
    $scope.stopClicked = function () {
        $rootScope.$emit("SendMessage",{type: Messagetype.MT_STOP, msg: ''});
    }
    $scope.onVolumeSliderChanged = function (){
        $rootScope.$emit("SendMessage",{type: Messagetype.MT_VOLUME_VALUE, msg: $scope.inputData.sliderVol});
    }
};

controllers.SonglistController = function($scope){
    $scope.convertMillisecondToMinSec = function(millisecond){
        var minutes = Math.floor(millisecond / 60000);
        var seconds = ((millisecond % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
};
controllers.ContactController = function($scope){
};

controllers.AboutController = function($scope){
};

controllers.NavigationController = function ($scope){
    var active = 'navigationActive';

    function clearVars(){
        $scope.varSonglistLinkClass = '';
        $scope.varContactLinkClass = '';
        $scope.varAboutLinkClass = '';
    }

    $scope.songlistViewOpened = function (){
        clearVars();
        $scope.varSonglistLinkClass = active;
    }

    $scope.contactViewOpened = function (){
        clearVars();
        $scope.varContactLinkClass = active;
    }

    $scope.aboutViewOpened = function (){
        clearVars();
        $scope.varAboutLinkClass = active;
    }
};

mainApp.controller(controllers);