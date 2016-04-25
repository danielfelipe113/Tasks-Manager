'use strict';

angular.module('tasksAdminApp', [
  'tasksAdminApp.auth',
  'tasksAdminApp.admin',
  'tasksAdminApp.constants',
  'tasksAdminApp.tasksFactory',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'validation.match',
  'ngAnimate',
  'ngMessages',
  'ngMaterial'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('red');
  });
  
