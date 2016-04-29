'use strict';

(function () {

  class tasksDashboardController {
    constructor(tasksFactory, appConfig) {
      this.appConfig = appConfig;
      this.tasks = {
        InProgress: [],
        ToDoToday: [],
        ToDo: [],
        Delayed: [],
        Done: []
      };
      this.tasksFactory = tasksFactory;

      //init
      this.initialize();
    }
    initialize() {
      this.getTasks();
    }

    getTasks() {
      this.tasksFactory.getTasks()
        .then((response) => {
          let that = this;
          let tempTasks = response.data;
          
          tempTasks.forEach(function (element) {
            if (element.Status.statusName === that.appConfig.tasksStatus.InProgress) {
              that.tasks.InProgress.push(element);
            } else if (element.Status.statusName === that.appConfig.tasksStatus.ToDoToday) {
              that.tasks.ToDoToday.push(element);
            } else if (element.Status.statusName === that.appConfig.tasksStatus.ToDo) {
              that.tasks.ToDo.push(element);
            } else if (element.Status.statusName === that.appConfig.tasksStatus.Delayed) {
              that.tasks.Delayed.push(element);
            } else if (element.Status.statusName === that.appConfig.tasksStatus.Done) {
              that.tasks.Done.push(element);
            } 
          }, this);

          console.log('tempTasks: ', tempTasks);
          console.log('Tasks: ', this.tasks)
        });
    }
  }

  angular.module('tasksAdminApp')
    .component('tasksDashboard', {
      templateUrl: 'app/tasksDashboard/tasksDashboard.html',
      controller: tasksDashboardController,
      controllerAs: 'main'
    });

})();
