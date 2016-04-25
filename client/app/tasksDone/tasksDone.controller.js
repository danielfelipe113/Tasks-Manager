'use strict';
(function(){

class TasksDoneComponent {
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
  .component('tasksDone', {
    templateUrl: 'app/tasksDone/tasksDone.html',
    controller: TasksDoneComponent,
    controllerAs: 'vm'
  });

})();
