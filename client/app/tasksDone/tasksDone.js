'use strict';

angular.module('tasksAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tasksDone', {
        url: '/tasksDone',
        template: '<tasks-done></tasks-done>'
      });
  });
