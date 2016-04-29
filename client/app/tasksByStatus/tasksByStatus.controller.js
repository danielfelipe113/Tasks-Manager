'use strict';
(function(){

class tasksByStatusController {
  constructor($http, tasksFactory, $stateParams, appConfig) {
      this.status = $stateParams.status;
      this.appConfig = appConfig;
      this.tasksFactory = tasksFactory;
      this.TaskModel = null;
      this.tasks = null;
      //init
      this.initialize();
    }
    
    initialize() {
      this.getTasks();
      this.setTaskModel();  
    }
    
    setTaskModel() {
      for (var status in this.appConfig.tasksStatus) {
        if (this.appConfig.tasksStatus.hasOwnProperty(this.status)) {
          if(this.status === this.appConfig.tasksStatus[status]) {
            this.TaskModel = this.appConfig.tasksStatus[status];
          }          
        }
      }
      console.log('TaskModel: ' + this.TaskModel)
    }
    
    getTasks() {
      this.tasksFactory.getTasksByStatus(this.status)
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
