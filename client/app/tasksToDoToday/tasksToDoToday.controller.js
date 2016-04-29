'use strict';
(function(){

class TasksToDoTodayComponent {
  constructor($http, tasksFactory) {
      this.$http = $http;
      this.awesomeThings = null;
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
          this.awesomeThings = response.data.results;
        });
    }
}

angular.module('tasksAdminApp')
  .component('tasksToDoToday', {
    templateUrl: 'app/tasksToDoToday/tasksToDoToday.html',
    controller: TasksToDoTodayComponent,
    controllerAs: 'vm'
  });

})();
