'use strict';
(function(){

class TasksDelayedComponent {
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
  .component('tasksDelayed', {
    templateUrl: 'app/tasksDelayed/tasksDelayed.html',
    controller: TasksDelayedComponent,
    controllerAs: 'vm'
  });

})();
