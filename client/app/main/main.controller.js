'use strict';

(function () {

  class MainController {
    constructor($http, tasksFactory, models) {
      this.$http = $http;
      this.awesomeThings = null;
      this.tasksFactory = tasksFactory;
      this.models = models;
      
      //init
      this.initialize();
    }
    initialize() {
      this.getTasks()  
      this.task = new this.models.createEmptyTask();
      console.log(this.task)
    }
    
    getTasks() {
      this.tasksFactory.getTasks()
        .then((response) => {
          this.awesomeThings = response.data.results;
        })
    }

    addThing() {
      this.$http.post('/api/tasks/', this.task)
        .then(function(response) {
          console.log(response)
        })
        .catch(function(err){
          console.log(err)
        })
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
