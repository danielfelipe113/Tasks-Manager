'use strict';

angular.module('tasksAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tasksByStatus', {
        url: '/tasksByStatus/:status',
        template: '<tasks-by-status></tasks-by-status>'
      });
  });
