'use strict';
(function(){

class TasksToDoComponent {
  constructor($http, tasksFactory) {
      this.$http = $http;
      this.awesomeThings = null;
      this.tasksFactory = tasksFactory;
      
      //init
      this.initialize();
    }
    initialize() {
      this.getTasks()  
    }
    
    getTasks() {
      this.tasksFactory.getTasks()
        .then((response) => {
          this.awesomeThings = response.data.results;
        })
    }
}

angular.module('tasksAdminApp')
  .component('tasksToDo', {
    templateUrl: 'app/tasksToDo/tasksToDo.html',
    controller: TasksToDoComponent,
    controllerAs: 'vm'
  });

})();
