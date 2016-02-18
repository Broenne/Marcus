// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        document.getElementById("btnPhoto").onclick = function() {
            //alert("Moin");
            navigator.camera.ima.getPicture(function (imageUri) {
                alert(imageUri);
                var photoContainer = document.getElementById("lastPhoto");
                photoContainer.innerHTML = "<img src= " + imageUri + " style='width: 75%' />";
            }, null, null);
        };


        document.getElementById("btnGrey").onclick = function () {
            var photoContainer = document.getElementById("greyPhoto");
            var uri = grayscale('images/20151223_191253.jpg');
            //alert(uri);
            photoContainer.innerHTML = "<img src= " + uri + " style='width: 75%' />";
        };

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();