'use strict';
/**
 * tengo que revisar los endpoints porque no me están encontrando las tareas del usuario por el Id
 * 
 */

class createTaskController {
    constructor($http, tasksFactory, dataModel, $mdDialog, models, values, appConfig, Auth, usersFactory, toastFactory, $q) {
        //dependencies
        this.$q = $q;
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
        this.isNewTask = true;
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
        this.task = dataModel;
        this.newTask = null;
        this.submitted = false;

        //init
        this.initialize();
    }

    initialize() {
        //data logic

        //methods
        this.populateTask();
        this.getPriorities();
        this.getStatus();
        this.setUserRol()
            .then(res => {
                if (res != 'Employee') {
                    this.getUsers();
                }
            });
        this.newTask.AssignBy = this.currentUser;
    }

    setUserRol() {
        let deferred = this.$q.defer();

        if (this.currentUser.role === this.appConfig.userRolesJson.Employee) {
            this.isEmployee = true;
            deferred.resolve('Employee')
        } else if (this.currentUser.role === this.appConfig.userRolesJson.Administrator) {
            this.isAdministrator = true;
            deferred.resolve('Administrator')
        } else {
            deferred.resolve('Supervisor')
        }
        return deferred.promise
    }

    populateTask() {
        if (this.task !== null) {
            console.log('soy viejo2')
            this.newTask = this.task;
            this.newTask.DoBeforeDate = new Date(this.task.DoBeforeDate);
            this.isNewTask = false;

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
        this.submitted = true;
        let messages = this.values.values();
        let that = this;
        console.log(this.newTask)
        if (isValid) { //create task
            if (this.isNewTask) {
                console.log('soy nuevo')
                this.tasksFactory.postTask(this.newTask)
                    .then((res) => {
                        that.toastFactory.successToast(messages.MESSAGES.TASKS.CREATESUCCESS);
                        that.$mdDialog.hide();
                    })
                    .catch((err) => {
                        that.toastFactory.errorToast(messages.MESSAGES.ERROR);
                        that.$mdDialog.cancel();
                    });
            } else { //save task
                console.log('soy viejo')
                this.tasksFactory.putTask(this.newTask._id, this.newTask)
                    .then(res => {
                        console.log(res)
                        that.toastFactory.successToast(messages.MESSAGES.TASKS.CREATESUCCESS);
                        that.$mdDialog.hide();
                    })
                    .catch(err => {
                        console.log(err)
                        that.toastFactory.errorToast(messages.MESSAGES.ERROR);
                        that.$mdDialog.cancel();
                    })
            }
        }
        return false;
    }

    closeDialog() {
        this.$mdDialog.cancel();
    }
}

angular.module('tasksAdminApp')
    .controller('createTaskController', createTaskController);

