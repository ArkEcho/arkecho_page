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

    $scope.connectClicked = function (){
        var address = prompt('Bitte die Adresse des ArkEcho-Players eingeben!');
        if(address != '') openConnection(address);
    }
    
    $rootScope.$on("SendMessage", function(event, args){
        sendMessage(args.type, args.msg);
    });

    // Set WebSocket and implement Events
    function openConnection(address){
        webSocket_ = new WebSocket('ws://' + address);

        webSocket_.onopen = function (evt) {
            open_ = true;
            sendMessage(Messagetype.MT_REQUEST_SONG_ACTUAL, '');
        }

        webSocket_.onclose = function (evt) {
            open_ = false;
            alert('Verbindung zum ArkEcho Player unterbrochen!');
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
                $scope.coverArt = song.CoverArt;
                setCoverArtImage();
            }
            $route.reload()
        }

        webSocket_.onerror = function (evt) {
            open_ = false;
        }
    }

    function closeConnection()    {
        webSocket_.close();
    }

    function sendMessage(type, message)    {
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

controllers.HomeController = function($scope, $rootScope){
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

controllers.ContactController = function($scope){
};

controllers.AboutController = function($scope){
};

controllers.NavigationController = function ($scope){
    var active = 'navigationActive';

    function clearVars(){
        $scope.varHomeLinkClass = '';
        $scope.varContactLinkClass = '';
        $scope.varAboutLinkClass = '';
    }

    $scope.homeViewOpened = function (){
        clearVars();
        $scope.varHomeLinkClass = active;
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