"use strict";

//http://jsfiddle.net/scyrizales/rUbsE/

app.controller("TimeCtrl", function ($scope, getTime) {
    $scope.format = "M/d/yy hh:mm:ss";
    $scope.actTime = getTime;
});



app.factory('getTime', function () {
    return { actTime: '' };
});

app.directive("myCurrentTime", function (dateFilter) {
    return function ($scope, element, attrs) {
        var format;

        $scope.$watch(attrs.myCurrentTime, function (value) {
            format = value;
            updateTime();
        });

        function updateTime() {
            var newDate = new Date(); 
            var dt = dateFilter(newDate, format);
            $scope.actTime = dateFilter(newDate, "hh:mm:ss");
            element.text(dt);
        }

        function updateLater() {
            setTimeout(function () {
                updateTime(); // update DOM
                updateLater(); // schedule another update
            }, 1000);
        }

        updateLater();
    }
});