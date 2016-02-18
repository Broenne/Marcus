/// <reference path="../htmlTemplates/NavBarTemplate.html" />
/// <reference path="htmlTemplates/NavBarTemplate.html" />
/// <reference path="../Scripts/angular.js" />
/// <reference path="../Scripts/angular-mocks.js" />
/// <reference path="../Scripts/angular-scenario.js" />
/// <reference path="../Scripts/angular-resource.js" />
/// <reference path="../Scripts/angular-route.js" />
/// <reference path="~/Services/jsapi.js" />
///// <reference path="C:\apps\Marcus_Spielwiese\WebApplication3\Partials/NavBarTemplate.html" />


// http://www.codeproject.com/Tips/829348/IntelliSense-for-JavaScript-Files-js-in-Visual-Stu
"use strict";

var app = angular.module("HelloMarcus", ["ngRoute", 'ui.bootstrap'])
    .value('Author', 'marcus')
    .value('version', 'v0.0.0');


//app.controller("calibrationPointsCtrl", function ($scope) {
//    $scope.Data = "xxx";
//    //$scope.actTime = getTime;
//});

//http://stackoverflow.com/questions/18421830/how-to-wait-till-the-response-comes-from-the-http-request-in-angularjs
// odata test
app.controller('calibrationPoints', function ($scope, $http, $interval) {
    $scope.calibrationData = "default";
    // todo mb achtung, das ist die veraltet variant!!!!
    $http.get('http://localhost:2344/api/Default/CalibrationPointsAsync?userId=24&roleId=9').
        success(function (data) {
            // console.log(data);
            var deserializedJson = angular.fromJson(data);

            var myData = new google.visualization.DataTable();
            myData.addColumn('number', 'X');
            myData.addColumn('number', 'Y');
            for (var prop in deserializedJson) {
                if (deserializedJson.hasOwnProperty(prop)) {
                    myData.addRow(
                        [parseFloat(prop), parseFloat(deserializedJson[prop])]
                    );
                }
            }

            $interval(
               function () {
                   $scope.data = myData;
               }
           , 250);

            $scope.opt = {
                pointSize: 10,
                title: 'Hallo Kalibrierdaten',
                curveType: 'function',
                legend: { position: 'bottom' }
            };

        }).
        error(function () {
            alert("error calibration Points web service");
        });
});


// Directive
app.directive('calibrationlinechart', (function () {
    return {
        restrict: 'A',
        link: function (scope, $elm, attrs) {
            function plotGraph() {
                // console.log(attrs.calibrationlinechart);
                var chart = new google.visualization.LineChart($elm[0]);
                chart.draw(scope.data, scope.opt);
            }
            function updateLater() {
                setTimeout(function () {
                    plotGraph(); // update DOM
                    updateLater(); // schedule another update
                }, 250);
            }
            updateLater();
        }
    }
}));





//http://stackoverflow.com/questions/18421830/how-to-wait-till-the-response-comes-from-the-http-request-in-angularjs
// odata test
app.controller('oData', function ($scope, $http) {
    //$http.get('http://services.odata.org/v4/%28S%28rcxe0ulghlkuu4pvb0hvz4x5%29%29/TripPinServiceRW/People').

    $scope.Url = "default";
    $http.get('http://services.odata.org/v4/(S(rcxe0ulghlkuu4pvb0hvz4x5))/TripPinServiceRW/People').
        success(function (data) {
            console.log(data);
            var deserializedJson = angular.fromJson(data);
            $scope.Url = deserializedJson["@odata.context"];
            console.log("url: " + $scope.Url);
        }).
        error(function () {
            alert("error oData");
        });
});

// liest online temperatur. achtung filter json noch nicht
app.controller('temperatureController', function ($scope, $http) {
    $http.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2de143494c0b295cca9337e1e96b00e0').
        success(function (data) {
            console.log(data);
            $scope.products = data;

        }).
        error(function () {
            alert("error")});
});




app.controller('PasswordController', function PasswordController($scope) {
    $scope.password = '';
    $scope.grade = function() {
        var size = $scope.password.length;
        if (size > 8) {
            $scope.strength = 'strong';
        } else if (size > 3) {
            $scope.strength = 'medium';
        } else {
            $scope.strength = "weak";
        }
    };
});


