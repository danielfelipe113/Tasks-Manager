'use strict';
(function () {

  class tasksByStatusController {
    constructor($http, tasksFactory, $stateParams, appConfig) {
      this.status = $stateParams.status;
      this.id = $stateParams.id;
      this.tasksFactory = tasksFactory;
      this.user = null;

      //init
      this.initialize();
    }

    initialize() {
      this.getTasks(this.id);
    }

    getTasks(id) {
      this.tasksFactory.getTasksConstructor(id, false)
        .then(response => {
          this.user = response.user
          console.log(this.user)
          console.log(this.user.tasks[this.status][0].Status.statusDescription)
        });
    }
  }

  angular.module('tasksAdminApp')
    .component('tasksByStatus', {
      templateUrl: 'app/tasksByStatus/tasksByStatus.html',
      controller: tasksByStatusController,
      controllerAs: 'vm'
    });

})();
