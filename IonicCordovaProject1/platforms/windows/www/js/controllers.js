var app = angular.module('starter.controllers', []);

app.controller('camCtrl', function($scope, camera, $ionicPopup, $ionicLoading, $ionicModal) {
        console.log("cam");
        $scope.getPhoto = function() {
            console.log('Getting camera');
            // todo. insert this service!! �bergabe der funktion camera per injection
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
    $ionicModal.fromTemplateUrl("./templates/imageSaveModal.html",{
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






    var imageStorageKey = 'images';
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
                requestFileSystemSuccessCallback(),
                requestFileSystemErrorCallback);
            $ionicLoading.hide();
        }

        //localStorage.setItem("firstname", "Nic");
        //localStorage.setItem("lastname", "Raboy");
        //var alert = $ionicPopup.alert({
        //    title:"test",
        //    template:localStorage.getItem("firstname") + " " + localStorage.getItem("lastname")
        //});
        //addImage($scope.lastPhoto);
        //alert("Your Image" + localStorage.getItem(imageStorageKey));
    }// end storeLocal


    function requestFileSystemErrorCallback() {
        $ionicLoading.hide();
        alert.log("Request for filesystem failed");
    }

    function requestFileSystemSuccessCallback(fs) {
        //ile:///android_asset/www/js/controllers.js: Line 77 : FileSystem: undefined
        console.log("FileSystem: " + fs);
        fs.root.getDirectory(
            "Downloads", // todo hier ist noch ein fehler, argumente �berarbeiten
            {
                create: true
            },
            //TypeError: Cannot read property 'root' of undefined
            function(dirEntry) {
                var output;
                for (var item in dirEntry) {
                    output = output + item + "\n"; //todo mb check if console is running
                }
                console.log("dir: " + output);
                /*$ionicPopup.alert({
                    title: "dirEntry",
                    template: output
            });*/
            },
            function() {
                $ionicLoading.hide();
                alert.log("getDirectory failed");
            });
    };//getDirectory


    var images;
    // todo mb: use constants insteadt of  strings!
    function addImage(img) {
        console.log("images: " + images);
        images.push(img);
        window.localStorage.setItem('images', JSON.stringify(images));
    };


    $scope.pushToDropbox = function() {
        console.log("Start Push Photo to dropbox.");
        // https://blog.nraboy.com/2014/10/syncing-data-dropbox-using-ionicframework/
        //dropboxClient = new Dropbox.Client({ key: dropboxAppKey, token: response.access_token, uid: response.uid });
        var dropboxClient = new window.Dropbox.Client();
        console.log(dropboxClient);

        //https://itsmebhavin.wordpress.com/2015/02/18/ionicangular-syncing-data-with-dropbox-using-ionic-framework/
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