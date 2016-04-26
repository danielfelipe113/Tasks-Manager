'use strict';


class createTaskController {
    constructor($http, tasksFactory, items, $mdDialog, models) {
        this.$http = $http;
        this.models = models;
        this.taskModels = {};
        this.awesomeThings = null;
        this.$mdDialog = $mdDialog;
        this.tasksFactory = tasksFactory;
        this.items = items;
        this.submitted = false;
        this.task = null;
        this.isNew = false;
        //init
        this.initialize();
    }
    initialize() {
        this.getTasks();
        this.populateTask();
        this.taskModel();
    }

    populateTask() {
        if (this.items !== null) {
            if (this.items.Id === 0) {
                this.task = new this.models.createEmptyTask();
            } else {
                this.task = this.items;
            }
        } else {
            this.task = new this.models.createEmptyTask();
        }
    }
    
    taskModel() {
        this.taskModels = new this.models.createTaskModel();
        console.log(this.taskModels)
    }

    saveTask(isValid) {
        this.submitted = true;
        if (isValid) {
            this.$mdDialog.hide()
            console.log(this.task)
        }
        return false
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
