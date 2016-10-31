var app = angular.module('CheerioMongoHW', ['ngRoute', 'ui.router', "ngStorage", 'ngAnimate'])
    .config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: "MainController"
        });
    $locationProvider.html5Mode(true);

}]);































