'use strict';

angular.module('tasksAdminApp.admin')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'vm',
        authenticate: 'admin'
      });
  });
