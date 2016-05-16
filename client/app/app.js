'use strict';

angular.module('tasksAdminApp', [
  'tasksAdminApp.auth',
  'tasksAdminApp.admin',
  'tasksAdminApp.constants',
  'tasksAdminApp.common',
  'tasksAdminApp.usersFactory',
  'tasksAdminApp.tasksFactory',
  'tasksAdminApp.toastFactory',
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
      .otherwise('/login');

    $locationProvider.html5Mode(true);
  })
  .config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('red');
  });
  
