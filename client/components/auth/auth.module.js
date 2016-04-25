'use strict';

angular.module('tasksAdminApp.auth', [
  'tasksAdminApp.constants',
  'tasksAdminApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
