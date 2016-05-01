'use strict';


class createTaskController {
    constructor($http, tasksFactory, task, $mdDialog, models, values, appConfig, Auth, usersFactory, toastFactory) {
        //dependencies
        this.$http = $http;
        this.models = models;
        this.values = values;
        this.$mdDialog = $mdDialog;
        this.tasksFactory = tasksFactory;
        this.appConfig = appConfig;
        this.toastFactory = toastFactory;
        this.Auth = Auth;
        this.usersFactory = usersFactory;
        //dependencies methods

        //vars
        this.currentUser = Auth.getCurrentUser().toJSON();
        this.isEmployee = false;
        this.isAdministrator = false;
        this.taskModels = {};
        this.priorities = null;
        this.taskStatus = null;
        this.users = {
            Supervisors: [],
            Administrators: [],
            Employees: []
        };
        this.task = task;
        this.newTask = null;
        this.submitted = false;

        //init
        this.initialize();
    }

    initialize() {
        //methods
        this.populateTask();
        this.getPriorities();
        this.getStatus();
        this.getUsers();
        
        //data logic
        this.newTask.AssignBy = this.currentUser;
        this.newTask.AssignDate = new Date();
    }

    setUserRol() {
        this.isAdministrator = this.Auth.isAdmin();
        
        if (this.currentUser.role === this.appConfig.userRolesJson.Employee) {
            this.isEmployee = true;
            this.newTask.AssignTo = this.currentUser;
        }
    }

    populateTask() {
        if (this.task !== null) {
            if (this.task.Id === 0) {
                this.newTask = new this.models.createEmptyTask();
            } else {
                this.newTask = this.task;
            }
        } else {
            this.newTask = new this.models.createEmptyTask();
        }
    }

    getPriorities() {
        this.priorities = this.values.getPriorities();
    }

    getUsers() {
        let that = this;
        let tempUsers = null;

        this.usersFactory.getUsers()
            .then((response) => {
                tempUsers = response.data;
                setUsers();
                this.setUserRol();
            })
            .catch((err) => {
                console.log(err);
            });

        function setUsers() {
            tempUsers.forEach(function (element) {
                if (element.role === that.appConfig.userRolesJson.Supervisor) {
                    that.users.Supervisors.push(element);
                } else if (element.role === that.appConfig.userRolesJson.Administrator) {
                    that.users.Administrators.push(element);
                } else if (element.role === that.appConfig.userRolesJson.Employee) {
                    that.users.Employees.push(element);
                }
            }, this);
        }

    }

    getStatus() {
        this.taskStatus = this.values.getStatus();
    }

    //submit
    saveTask(isValid) {
        let that = this;
        this.submitted = true;
        
        if (isValid) {
            this.tasksFactory.postTask(this.newTask)
                .then(() => {
                    that.toastFactory.successToast();
                    that.$mdDialog.hide();
                })
                .catch(() => {
                    that.toastFactory.errorToast();
                    that.$mdDialog.cancel();
                });
        }
        return false;
    }

    closeDialog() {
        this.$mdDialog.cancel();
    }
}

angular.module('tasksAdminApp')
    .controller('createTaskController', createTaskController);

