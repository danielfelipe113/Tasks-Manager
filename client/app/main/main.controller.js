'use strict';

(function () {

  class MainController {
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

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', { name: this.newThing });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('tasksAdminApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'main'
    });

})();
