'use strict';

angular.module('tasksAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tasksInProgress', {
        url: '/tasksInProgress',
        template: '<tasks-in-progress></tasks-in-progress>'
      });
  });
