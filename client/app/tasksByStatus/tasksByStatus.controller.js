'use strict';
(function () {

  class tasksByStatusController {
    constructor($http, tasksFactory, $stateParams, appConfig, dialogService, values, Auth) {
      this.dialogService = dialogService;
      this.status = $stateParams.status;
      this.id = $stateParams.id;
      this.tasksFactory = tasksFactory;
      this.user = null;
      this.values = values.values();
      this.currentUser = Auth.getCurrentUser().toJSON();

      //init
      this.initialize();
    }

    initialize() {
      this.getTasks(this.id);

    }

    getTasks(id) {
      this.tasksFactory.getTasksConstructor(id, false)
        .then(response => {
          this.user = response.user;
        });
    }
    
    taskDetails($event, task) {
      let that = this;
      let template = './app/partials/taskDetails/taskDetails.html';
      let controller = 'taskDetailsController';

      this.dialogService.showDialog($event, template, controller, task);
    }

    editTask($event, task) {
      let that = this;
      let taskToEdit = task;
      let template = './app/partials/createTask/createTask.html';
      let controller = 'createTaskController';

      function callback() {
        that.getTasks(that.id);
      }

      this.dialogService.showDialog($event, template, controller, taskToEdit, callback);
    }

    removeTasks($event, task) {
      let that = this;
      let template = './app/partials/confirmPartials/confirm.html';
      let controller = 'confirmController';
      let messages = this.values; 
     
     let data = this.values.CONFIRM.TYPE.TASK;
     
      function callback() {
        that.tasksFactory.deleteTask(task._id)
          .then(res => {
            that.getTasks(that.id)
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
      
      this.dialogService.showDialog($event, template, controller, data, callback);
      
    }

  }

  angular.module('tasksAdminApp')
    .component('tasksByStatus', {
      templateUrl: 'app/tasksByStatus/tasksByStatus.html',
      controller: tasksByStatusController,
      controllerAs: 'vm'
    });

})();
