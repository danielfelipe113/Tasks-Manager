'use strict';

angular.module('tasksAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('tasksDashboard', {
        url: '/dashboard/:id',
        template: '<tasks-dashboard></tasks-dashboard>'
      });
  });
