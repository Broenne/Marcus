/// <reference path="/Services/Modules.js" /> // reference the angie module
var ctrl, ctrlScope, injector;

QUnit.module("Testing the Passwordcontroller", {
    setup: function () {
        angular.module("HelloMarcus");
        injector = angular.injector(['ng', 'HelloMarcus']);

        ctrlScope = injector.get('$rootScope').$new();// get a clean scope
        ctrl = injector.get('$controller')('PasswordController', { $scope: ctrlScope }); // get the controller to test
    },
    teardown: function () {

    }
});

test("check functzion from controller.", function () {
    ctrlScope.password = 'longerthaneightchars';
    ctrlScope.grade();
    window.console.log(ctrlScope.strength);
    window.equal(ctrlScope.strength, "strong");
});

test("Check Variable in scope", function () {
    ctrlScope.password = 'longerthaneightchars';
    window.equal('longerthaneightchars', ctrlScope.password);
});