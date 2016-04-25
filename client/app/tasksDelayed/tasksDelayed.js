'use strict';

angular.module('tasksAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tasksDelayed', {
        url: '/tasksDelayed',
        template: '<tasks-delayed></tasks-delayed>'
      });
  });
