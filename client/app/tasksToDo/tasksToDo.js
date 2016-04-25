'use strict';

angular.module('tasksAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tasksToDo', {
        url: '/tasksToDo',
        template: '<tasks-to-do></tasks-to-do>'
      });
  });
