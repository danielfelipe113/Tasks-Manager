'use strict';


class createTaskController {
  constructor($http, tasksFactory, items, $mdDialog) {
      this.$http = $http;
      this.awesomeThings = null;
      this.$mdDialog = $mdDialog;
      this.tasksFactory = tasksFactory;
      this.task = {};
      console.log('heyy', items)
      //init
      this.initialize();
    }
    initialize() {
      this.getTasks()  
    }
    
    saveTask() {
        console.log(this.task)
        this.$mdDialog.hide()
    }
    
    closeDialog() {
        this.$mdDialog.cancel()
    }
    
    getTasks() {
      this.tasksFactory.getTasks()
        .then((response) => {
          this.awesomeThings = response.data.results;
        })
    }
}

angular.module('tasksAdminApp')
  .controller('createTaskController', createTaskController);

