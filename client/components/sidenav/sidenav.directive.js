'use strict';

angular.module('tasksAdminApp')
  .directive('sidenav', () => ({
    templateUrl: 'components/sidenav/sidenav.html',
    restrict: 'E',
    controller: 'SidenavController',
    controllerAs: 'vm'
  }));
