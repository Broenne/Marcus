angular.module('starter.services', [])
    
.factory("platform", [
    '$q',function($q) {
        return{
            getPlatform:function() {
                var q = $q.defer();
                if (ionic.Platform.isAndroid()) {
                    console.log("Plattform is android");
                    q.resolve("isAndroid");
                } else {
                    console.log("unknown plattform!");
                    q.resolve("unknown plattform!");
                }
                return q.promise;
            }
        }
    }
])


.factory("camera", [
    '$q', function($q) {
        return {
            getPicture: function (options) {
                console.log("in camera service");
                var q = $q.defer();
                navigator.camera.getPicture(function(result) {
                    q.resolve(result);
                }, function(error) {
                    //An error occured
                    q.resolve(result);
                });
                // todo mb: add error handling
                /*
                navigator.camera.getPicture(function (result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);
                */

                return q.promise;
            }
        }
    }
]);
