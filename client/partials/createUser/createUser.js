'use strict';

angular.module('tasksAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('createUsers', {
        url: '/createUsers/',
        template: '<create-users></create-users>',
        authenticate: true
      });
  });
