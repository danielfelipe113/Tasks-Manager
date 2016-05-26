'use strict';

angular.module('tasksAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('taskDetails', {
        url: '/taskDetails/:id',
        template: '<task-details></task-details>',
        authenticate: true
      });
  });
