'use strict';

angular.module('tasksAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('editUser', {
        url: '/editUser/:id',
        template: '<edit-user></edit-user>',
        authenticate: true
      });
  });
