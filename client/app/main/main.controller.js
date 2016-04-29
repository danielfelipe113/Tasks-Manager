'use strict';

(function () {

  class MainController {
    constructor(tasksFactory) {
      this.tasks = null;
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
          this.tasks = response.data;
          console.log('Tasks: ', this.tasks);
        });
    }
  }

  angular.module('tasksAdminApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'main'
    });

})();
