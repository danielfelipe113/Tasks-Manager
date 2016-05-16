'use strict';

angular.module('tasksAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        template: '<users></users>',
        authenticate: true
      });
  });
