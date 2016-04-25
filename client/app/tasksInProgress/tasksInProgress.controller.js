'use strict';
(function(){

class TasksInProgressComponent {
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
  .component('tasksInProgress', {
    templateUrl: 'app/tasksInProgress/tasksInProgress.html',
    controller: TasksInProgressComponent,
    controllerAs: 'vm'
  });

})();
