var app = angular.module('starter.controllers', []);

app.controller('camCtrl', function($scope, camera, $ionicPopup, $ionicLoading, $ionicModal) {
        console.log("cam");
        $scope.getPhoto = function() {
            console.log('Getting camera');
            // todo. insert this service!! übergabe der funktion camera per injection
            camera.getPicture({
                quality: 75,
                targetWidth: 320,
                targetHeight: 320,
                saveToPhotoAlbum: false,
                sourceType: 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                encodingType: 0 // 0=JPG 1=PNG
            }).then(function(imageUri) {
                console.log("imageUri: " + imageUri);
                $scope.lastPhoto = imageUri;
            });
        }


/////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/imageSaveModal.html',{
        scope: $scope,
        animation:'slide-in-up'
    }).
    then(function(modal) {
        $scope.modal = modal;
    });
    
    $scope.editFileName =  function() {
        console.log("Hello, welcome to edit file name.");
        $scope.modal.show();
    }
///////////////////////////////////////////////////////////////////////

    $scope.storeLocal = function() {
        $ionicLoading.show({
            template: 'Loading...'
        });
        // type, size, success callback, error callback
        document.addEventListener("deviceready", onDeviceReady, false);
        // ist on device redy nicht schon in der app.js abgedeckt?
        function onDeviceReady() {
            console.log("onDeviceReady");
            window.requestFileSystem(
                LocalFileSystem.PERSISTENT,
                0,
                requestFileSystemSuccessCallback,
                requestFileSystemErrorCallback);
            $ionicLoading.hide();
        }
    }// end storeLocal

    function requestFileSystemSuccessCallback(fs) {
        //ile:///android_asset/www/js/controllers.js: Line 77 : FileSystem: undefined
        console.log("FileSystem: " + fs);
        fs.root.getDirectory(
            "Downloads",
            {
                create: true
            },
            //TypeError: Cannot read property 'root' of undefined
            getDirectorySucess,
            function () {
                $ionicLoading.hide();
                alert.log("getDirectory failed");
            });
    };//getDirectory

    function requestFileSystemErrorCallback() {
        $ionicLoading.hide();
        alert.log("Request for filesystem failed");
    }

    function getDirectorySucess(dirEntry) {
        //var output = "";
        //for (var item in dirEntry) {
        //    output = output + dirEntry[item] + "\n"; //todo mb check if console is running
        //}
        //console.log("dir: " + output);
        dirEntry.getFile(
            "test.png",
            {
                create: true,
                exclusive: false
            },
            gotFileEntry, //(fe),
            function() {
                $ionicLoading.hide();
                console.log("Get file failed");
            }
        );
    }

    function gotFileEntry(fe) {
            var p = fe.toURL();
            fe.remove();
            var ft = new FileTransfer();
            //var uriSource = encodeURI("http://ionicframework.com/img/ionic-logo-blog.png");
            var uriSource = encodeURI($scope.lastPhoto);
            console.log("uriSource: " + uriSource);
            ft.download(
                uriSource,
                p,
                function (entry) {
                    $ionicLoading.hide();
                    $scope.imgFile = entry.toURL();
                    console.log("$scope.imgFile" + $scope.imgFile);
                },
                function (error) {
                    $ionicLoading.hide();
                    alert("Download Error Source -> " + error.source);
                },
                false,
                null
            );
        }
   
    $scope.pushToDropbox = function() {
        console.log("Start Push Photo to dropbox.");
        // https://blog.nraboy.com/2014/10/syncing-data-dropbox-using-ionicframework/
        // from appwiese video??
        // mb verzicht auf z.B. activex für internet explorer oder ähnlichess
        function makeHttpRequest() {
            try {
                var xMLHttpRequest = new XMLHttpRequest();
                console.log("XMLHttpRequest" + xMLHttpRequest);
                return xMLHttpRequest;
            } catch (error) {
                console.log("http-request error" + error);
            }

            throw new Error("Error in http request");
        }
        var appKey = "b0p253cf4pkii3h";
        //var appSecret = "oo2m6n2gfi6qzg2";
        var token = "1yzDVBJGRy4AAAAAAABvB_d0mwqveAbG1XO8pet2mDYkK_IBunaAZLQQ4jAl5SIn";
        var accessTokenRequest = new makeHttpRequest();
        

        //achtung, das braucht man anscheinend nur wenn man den accces token noch holen muss
        /*
        var httpString = "https://www.dropbox.com/1/oauth2/authorize?client_id="+ appKey + 
            "&redirect_uri=http://localhost/callback" + "&response_type=token";
        accessTokenRequest.open('Get', httpString, true);
        accessTokenRequest.send();
        accessTokenRequest.onreadystatechange = function () { }*/
        var httpString = "https://www.dropbox.com/1/oauth2/authorize?client_id=" + appKey +
            "&redirect_uri=http://localhost/callback" + "&response_type=token";
        var request = new makeHttpRequest();
        accessTokenRequest.open('Get', httpString, true);
        accessTokenRequest.send();


        console.log("httpString" + httpString);
        console.log("End Push Photo to dropbox.");
    }
});

app.controller("geoCtrl", function ($scope) {
    console.log("welcome to geolocation controller.");
    $scope.latitude = 0;
    $scope.longitude = 0;
    $scope.getPosition = function () {
        console.log("start getPosition.");
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("In get position.");
            var crd = position.coords;
            // hint mb: need to inform angular that scope is updated "scope.apply"
            $scope.$apply(function() {
                $scope.latitude = crd.latitude;
                $scope.longitude = crd.longitude;
                //console.log('Latitude : ' + $scope.latitude);
                //console.log('Longitude: ' + $scope.longitude);
            });
            var latLng = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            initialize(latLng);
            markerFunc(latLng);
            // console.log("latLng: " + latLng);
        }, function (error) {
            alert.log("Error in geolocation:" + error);
        });
    }

    function markerFunc(position) {
        var marker = new window.google.maps.Marker({
            position: position,
            map: $scope.map,
            title: 'Hello World!'
        });
    }

    function initialize(latLng) {
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        };
        var element = document.getElementById("map-canvas");
        // console.log("element: " + element);
        $scope.map = new window.google.maps.Map(element, mapOptions);
        // console.log("$scope.map:" + $scope.map);
    }
    console.log("End geolocation:");
});

app.controller("copyrightCtrl", function ($scope, platform) {
    console.log("Welcome to coyright Controller");
    platform.getPlatform().then(function(result) {
        console.log("Platform: " + result);
    });
});