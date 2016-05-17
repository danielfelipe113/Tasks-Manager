'use strict';

(function () {

  class AdminController {
    constructor(User, usersFactory, dialogService, values) {

      this.dialogService = dialogService;
      this.usersFactory = usersFactory;
      this.usersByRole = null;
      this.userRoleSelected = null;
      this.hover = false;
      this.values = values.values();
      this.userRoles = [
        {
          role: 'Administrator',
          description: 'Administradores'
        },
        {
          role: 'Supervisor',
          description: 'Supervisores'
        },
        {
          role: 'Employee',
          description: 'Empleados'
        }
      ];

    }

    userDetails($event, user) {
      let that = this;
      let template = './app/partials/userDetails/userDetails.html';
      let controller = 'userDetailsController';

      this.dialogService.showDialog($event, template, controller, user);
    }

    editUser($event, user) {
      let that = this;
      let template = './app/partials/editUser/editUser.html';
      let controller = 'editUserController';

      function callback() {
        that.getUsersByRole();
      }

      this.dialogService.showDialog($event, template, controller, user, callback);
    }

    getUsersByRole() {
      this.usersFactory.getUsersByRole(this.userRoleSelected)
        .then((response) => {
          this.usersByRole = response.data;
        })
        .catch((err) => {
          console.log(err)
        })
    }

    removeUser($event, userId) {
      let that = this;
      let template = './app/partials/confirmPartials/confirm.html';
      let controller = 'confirmController';
      let messages = this.values;

      let data = this.values.CONFIRM.TYPE.USER;

      function callback() {
        that.usersFactory.deleteUser(userId)
          .then(() => {
          })
        that.getUsersByRole();
      }
      this.dialogService.showDialog($event, template, controller, data, callback);
    }

  }

  angular.module('tasksAdminApp.admin')
    .controller('AdminController', AdminController);

})();
