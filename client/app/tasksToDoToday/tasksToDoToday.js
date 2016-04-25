'use strict';

angular.module('tasksAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tasksToDoToday', {
        url: '/tasksToDoToday',
        template: '<tasks-to-do-today></tasks-to-do-today>'
      });
  });
