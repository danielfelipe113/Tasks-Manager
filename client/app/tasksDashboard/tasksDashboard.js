'use strict';

angular.module('tasksAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('tasksDashboard', {
        url: '/',
        template: '<tasks-dashboard></tasks-dashboard>'
      });
  });
