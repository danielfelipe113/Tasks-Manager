'use strict';

angular.module('tasksAdminApp')
  .directive('header', () => ({
    templateUrl: 'components/header/header.html',
    restrict: 'E',
    controller: 'HeaderController',
    controllerAs: 'hd'
  }));
