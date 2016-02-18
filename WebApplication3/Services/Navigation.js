/// <reference path="../Scripts/angular.js" />
/// <reference path="../Scripts/angular-mocks.js" />
/// <reference path="../Scripts/angular-scenario.js" />
/// <reference path="../Scripts/angular-resource.js" />
/// <reference path="../Scripts/angular-route.js" />
/// <reference path="~/Services/jsapi.js" />
/// <reference path="Modules.js" />
/// <reference path="C:\apps\Marcus_Spielwiese\WebApplication3\Partials/NavBarTemplate.html" />
/// <reference path="./Partials/NavBarTemplate.html" />

//'A' - <span ng-sparkline></span> 
//'E' - <ng-sparkline></ng-sparkline> 
//'C' - <span class="ng-sparkline"></span> 
//'M' - <!-- directive: ng-sparkline -->
//var navigationModule = angular.module("navigationModule", []);
//menu.module('HHF', []);

app.directive('navigation', function (routeNavigation) {
    //element.addClass('nav');
    return {
        restrict: 'E',
        replace: true,
        //templateUrl: "Partials/NavBarTemplate.html",
        template: '<ul><li ng-repeat="route in routes" ng-class="{active: activeRoute(route)}"><a ng-href="#{{route.path }}">{{ route.name }}</a></li></ul>',
        controller: function($scope) {
            $scope.routes = routeNavigation.routes;
            $scope.activeRoute = routeNavigation.activeRoute;
        },
        link: function(scope, element, attributes) {
            element.addClass('navigation nav nav-pills ');
        }
    }
});

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "Partials/home.html",
        name: "home"
    }).when("/calibration", {
        templateUrl: "Partials/calibration.html",
        name: "calibration"
    }).when("/manual", {
        templateUrl: "Partials/manual.html",
        name: "manual"
    }).when("/oDataTest", {
        templateUrl: "Partials/oDataTest.html",
        name: "oDataTests"
    }).when("/settings", {
        templateUrl: "Partials/settings.html",
        name: "settings"
    }).when("/copyright", {
        templateUrl: "Partials/copyright.html",
        name: "copyright"
    }).otherwise({
        redirectTo: "Partials/NavBarTemplate.html"
    });
});

app.factory('routeNavigation', function ($route, $location) {
    var routes = [];
    angular.forEach($route.routes, function (route, path) {
        if (route.name) {
            routes.push({
                path: path,
                name: route.name
            });
        }
    });
    return {
        routes: routes,
        activeRoute: function (route) {
            return route.path === $location.path();
        }
    };
});