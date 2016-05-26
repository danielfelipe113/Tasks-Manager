'use strict';
(function () {

  class UsersComponent {
    constructor(Auth, tasksFactory, usersFactory, values, dialogService) {
      this.tasksFactory = tasksFactory;
      this.dialogService = dialogService;
      this.usersFactory = usersFactory;
      this.values = values.values();
      this.users = null;

      this.initialize();
    }

    initialize() {
      this.getSupervisedTasks();
    }

    getSupervisedTasks() {
      let that = this;
      this.tasksFactory.getSupervisedTasks()
        .then(function (res) {
          that.users = res;
        });
        
    }
  }

  angular.module('tasksAdminApp')
    .component('users', {
      templateUrl: 'app/users/users.html',
      controller: UsersComponent,
      controllerAs: 'vm'
    });

})();
