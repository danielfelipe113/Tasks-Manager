'use strict';
(function () {

  class tasksByStatusController {
    constructor($http, tasksFactory, $stateParams, appConfig, dialogService, values, $state, usersFactory) {
      this.$state = $state
      this.usersFactory = usersFactory;
      this.dialogService = dialogService;
      this.status = $stateParams.status;
      this.otherUserId = $stateParams.id;
      this.tasksFactory = tasksFactory;
      this.user = null;
      this.values = values;
      this.Status = this.values.getStatus();
      this.currentUser = null;
      this.tasks = null;
      
      //init
      this.initialize();
    }

    initialize() {
      this.getMe();
     
    }
    
    getTasks() {
      var tempId = null;
      if(this.otherUserIdid) {
        tempId = this.otherUserId
      } else {
        tempId = this.currentUser._id
      }
      
      this.tasksFactory.getTasksByStatus(tempId, this.status)
        .then(res => {
          this.tasks = res.data;
        });
    }
    
    getMe() {
        this.usersFactory.getMe()
            .then((response) => {
                this.currentUser = response;
                this.getTasks();
            });
    }

    createTasks($event) {
      this.tasksFactory.createTasks($event);
    }

    toTarget(target, task) { // need to be fixed
      let tempTask = task;
      if (target === 'InProgress') {
        tempTask.Status = this.Status[2];
      } else if (target === 'Done') {
        tempTask.Status = this.Status[4];
      }

      this.tasksFactory.putTask(tempTask)
        .then(() => {
        })
        .catch(() => {
        })
      this.getTasks(this.id);
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

      function callback(state) {
        let goToState = state || 'tasksDashboard';
        that.$state.go(goToState, {}, {
          reload: true
        })
      }

      this.dialogService.showDialog($event, template, controller, taskToEdit, callback);
    }

    removeTasks($event, task) {
      let that = this;
      let template = './app/partials/confirmPartials/confirm.html';
      let controller = 'confirmController';
      let messages = this.values.values();

      let data = messages.CONFIRM.TYPE.TASK;
      
      function callback() {
        that.tasksFactory.deleteTask(task._id)
          .then(res => {
            that.getTasks(that.id)
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
