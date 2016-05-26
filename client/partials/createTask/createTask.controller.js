'use strict';
(function () {

    class createTaskController {
        constructor($http, tasksFactory, models, values, appConfig, Auth, usersFactory, toastFactory, $q, $state) {
            //dependencies
            this.$q = $q;
            this.$state = $state;
            this.$http = $http;
            this.models = models;
            this.values = values;
            this.tasksFactory = tasksFactory;
            this.appConfig = appConfig;
            this.toastFactory = toastFactory;
            this.Auth = Auth;
            this.usersFactory = usersFactory;
            //dependencies methods

            //vars
            this.currentUser = null;
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
            this.task = null; // necesito hacer algo para que pueda editar (pasando el id del task, así lo cargo y se autocompletan los campos)
            this.newTask = null;
            this.submitted = false;

            //init
            this.initialize();
        }

        initialize() {
            let that = this;
            //data logic
            this.usersFactory.getMe().then(
                function (res) {
                    let parentScope = that;
                    that.currentUser = res;
                    that.populateTask();
                    that.getPriorities();
                    that.getStatus();
                    that.setUserRol()
                        .then(res => {
                            if (res !== 'Employee') {
                                parentScope.getUsers();
                            }
                        });
                    that.newTask.AssignBy = that.currentUser;
                });
            //methods

        }

        setUserRol() {
            let deferred = this.$q.defer();

            if (this.currentUser.role === this.appConfig.userRolesJson.Employee) {
                this.isEmployee = true;
                deferred.resolve('Employee');
            } else if (this.currentUser.role === this.appConfig.userRolesJson.Administrator) {
                this.isAdministrator = true;
                deferred.resolve('Administrator');
            } else {
                deferred.resolve('Supervisor');
            }
            return deferred.promise;
        }

        populateTask() {
            let that = this;
            if (this.$state.params.id) {
                this.tasksFactory.getTaskById(this.$state.params.id)
                    .then(function (res) {
                        that.newTask = res.data;
                        that.newTask.DoBeforeDate = new Date(res.data.DoBeforeDate);
                        that.isNewTask = false;
                    })
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
                });
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
            if (isValid) { //create task
                if (this.isNewTask) {
                    this.tasksFactory.postTask(this.newTask)
                        .then(() => {
                            that.toastFactory.successToast(messages.MESSAGES.TASKS.CREATESUCCESS);
                            that.$state.go('tasksDashboard')
                        })
                        .catch(() => {
                            that.toastFactory.errorToast(messages.MESSAGES.ERROR);
                        });
                } else { //save task
                    this.tasksFactory.putTask(this.newTask)
                        .then(() => {
                            that.toastFactory.successToast(messages.MESSAGES.TASKS.CREATESUCCESS);
                        })
                        .catch(err => {
                            console.log(err);
                            that.toastFactory.errorToast(messages.MESSAGES.ERROR);
                        });
                }
            }
            return false;
        }
    }

    angular.module('tasksAdminApp')
        .component('createTasks', {
            templateUrl: 'partials/createTask/createTask.html',
            controller: createTaskController,
            controllerAs: 'vm'
        });

})();
