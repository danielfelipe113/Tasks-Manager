'use strict';

angular.module('tasksAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('createTasks', {
        url: '/createTasks/:id',
        template: '<create-tasks></create-tasks>',
        authenticate: true
      });
  });
