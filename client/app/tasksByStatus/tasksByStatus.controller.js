'use strict';
(function(){

class tasksByStatusController {
  constructor($http, tasksFactory, $stateParams, appConfig) {
      this.status = $stateParams.status;
      this.myId = $stateParams.myId;
      this.tasksFactory = tasksFactory;
      this.tasks = null;
      //init
      this.initialize();
    }
    
    initialize() {
      this.getTasks();  
    }
    
    getTasks() {
      this.tasksFactory.getTasksByStatus(this.myId, this.status)
        .then((response) => {
          this.tasks = response.data;
          console.log(this.tasks)
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
