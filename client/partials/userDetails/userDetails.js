'use strict';

angular.module('tasksAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('userDetails', {
        url: '/userDetails/:id',
        template: '<user-details></user-details>',
        authenticate: true
      });
  });
