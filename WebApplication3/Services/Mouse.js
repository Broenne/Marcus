/// <reference path="Modules.js" />
/// <reference path="Time.js" />

//app.controller('mouseCtrl', function ($scope) {
//    //var time = getTimeService();
//    $scope.alert = function () {
//        alert('Time:');
//    };
//});

app.controller('mouseCtrl', function ($scope, getTime, dateFilter) {
    var time = new Date();//dateFilter(getTime, "hh:mm:ss");
    
    //var time = $scope.actTime.serializeToString;
    $scope.alert = function () {
        alert('Time when Mouseover: ' + time);
    };
});