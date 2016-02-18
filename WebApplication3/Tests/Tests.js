
/////<reference path="/Scripts/angular.js"/>
/////<reference path="/Scripts/angular-mocks.js"/>

// angular/jasmine/resharper only working in version 1.3
// Install-Package JasmineTest -Version 1.3.1 
//ReSharper Unit Testing

//If, like me, your Visual Studio extension tool of choice is ReSharper (R#),
//you may want to run its test runner instead. It should work fine, with one potential pitfall. If you try running your tests, but they all seem hung up, make sure you remove any references to jasmine.js from your _references.js file or from the top of any JavaScript files under test. I know that hurts, because now your editor won’t recognize the reference from within any of your Jasmine test files, leaving you with a bunch of blue squigglies. But for some reason, the R# test runner gets confused. I’m going to contact JetBrains about that.

// javascript texteditor to implicit/web

"use strict";

// this will run when resharper using jasmine 2.0 and install jasmine 2.3.4
describe("A suite", function () {
    //http://jasmine.github.io/1.3/introduction.html
    it("contains spec with an expectation", function () {
        expect(true).toBe(true);
    });
});

describe('oData', function () {

    beforeEach(module("HelloMarcus"));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('$scope.grade', function () {
        it('XXXX', function () {
            expect(true).toBe(true);
            //var $scope = {};
            //var controller = $controller('PasswordController', { $scope: $scope });
            //$scope.password = 'longerthaneightchars';
            //$scope.grade();
            //expect($scope.strength).toEqual('strong');
        });
    });
});

describe('PasswordController', function () {
    beforeEach(module("HelloMarcus"));

    var $controller;
    $controller.writeValue;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('$scope.grade', function () {
        it('sets the strength to "strong" if the password length is >8 chars', function () {
            var $scope = {};
            var controller = $controller('PasswordController', { $scope: $scope });
            $scope.password = 'longerthaneightchars';
            $scope.grade();
            expect($scope.strength).toEqual('strong');
        });
    });
});



////toBe
////toBeDefined
////toBeTruthy
////toEqual
////toMatch
////toContain
////toThrow
