'use strict';

(function () {
class editUserController {
    constructor($state, appConfig, usersFactory, toastFactory, values) {
        //dependencies
        this.toastFactory = toastFactory;
        this.values = values.values();
        this.usersFactory = usersFactory;
        this.appConfig = appConfig;
        this.$state = $state;
        //vars
        this.users = {
            Supervisors: [],
            Administrators: [],
            Employees: []
        };
        this.roles = appConfig.userRolesJson;
        this.user = null; //hacer get al usuario con el id que le paso
        //init
        this.initialize();
    }

    initialize() {
        //methods
        this.getUser();
        this.getUsers();

    }
    
    getUser() {
        let that = this;
        this.usersFactory.getUserById(this.$state.params.id)
            .then((res) => {
                that.user = res.data;
            })
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
            console.log(this.user)
            this.usersFactory.updateUser(this.user._id, this.user)
                .then(() => {
                    that.toastFactory.successToast(that.values.MESSAGES.USERS.SAVESUCCESS);
                    that.$state.go('tasksDashboard')
                })
                .catch(() => {
                    that.toastFactory.errorToast(that.values.MESSAGES.ERROR);
                });
        }
        return false;
    }
}


  angular.module('tasksAdminApp')
    .component('editUser', {
      templateUrl: 'partials/editUser/editUser.html',
      controller: editUserController,
      controllerAs: 'vm'
    });

})();
