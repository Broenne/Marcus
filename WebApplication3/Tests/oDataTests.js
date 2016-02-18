/// <reference path="C:\apps\Marcus_Spielwiese\WebApplication3\Services/Modules.js" />


// todo mb test to mock the http get response
var useStrict = "use strict";
var ctrl, ctrlScope, injector, http, rootScope;
// do intergationtest
QUnit.module("Testing the oDataTestController", {
    setup: function () {
        window.console.log("Start setup " + "\n");
        var appModule = window.angular.module("HelloMarcus");
        injector = window.angular.injector(["ng", "HelloMarcus"]);

        //https://dzone.com/articles/angularjs-integration-tests
        ctrlScope = injector.get("$rootScope").$new();// get a clean scope
        ctrlScope.xx = "yy";
        http = injector.get("$http");
        ctrl = injector.get("$controller")("oData", { $scope: ctrlScope, $http: http });
        
        window.console.log("ctrl: " + ctrl + "\n");
    },
    teardown: function () {
        // todo
    }
});

QUnit.test("Test oData service from web", function () {
    window.console.log("test: " + ctrlScope.Url);
    window.equal(ctrlScope.Url, "http://services.odata.org/V4/(S(rcxe0ulghlkuu4pvb0hvz4x5))/TripPinServiceRW/$metadata#People");
    // testen oder der gecallte webservice den scope gefüllt hat
});

QUnit.asyncTest("Test oData Ok test", function (assert) {
   
    assert.ok(ctrlScope.Url);
    window.console.log("test OK: " + ctrlScope.Url);
    QUnit.start();
    // testen oder der gecallte webservice den scope gefüllt hat
});

