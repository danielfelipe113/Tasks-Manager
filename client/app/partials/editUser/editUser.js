'use strict';

class editUserController {
    constructor(dataModel, $mdDialog, appConfig, usersFactory, toastFactory, values) {
        //dependencies
        this.toastFactory = toastFactory;
        this.values = values.values();
        this.usersFactory = usersFactory;
        this.$mdDialog = $mdDialog;
        this.appConfig = appConfig;

        //vars
        this.users = {
            Supervisors: [],
            Administrators: [],
            Employees: []
        };
        this.roles = appConfig.userRolesJson;
        this.user = dataModel;
        //init
        this.initialize();
    }

    initialize() {
        //methods
        this.getUsers();

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

    //submit
    saveForm(isValid) {
        this.user.fullName = this.user.firstName + ' ' + this.user.lastName;
        let that = this;

        if (isValid) {
            this.usersFactory.updateUser(this.user._id, this.user)
                .then(() => {
                    that.toastFactory.successToast(that.values.MESSAGES.USERS.SAVESUCCESS);
                    that.$mdDialog.hide();
                })
                .catch(() => {
                    that.toastFactory.errorToast(that.values.MESSAGES.ERROR);
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
    .controller('editUserController', editUserController);

