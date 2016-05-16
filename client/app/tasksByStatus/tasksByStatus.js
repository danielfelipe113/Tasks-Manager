'use strict';

angular.module('tasksAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tasksByStatus', {
        url: '/tasksByStatus/:id/:status',
        template: '<tasks-by-status></tasks-by-status>',
        authenticate: true
      });
  });
