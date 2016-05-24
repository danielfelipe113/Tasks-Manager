'use strict';
(function () {

  class UsersComponent {
    constructor(Auth, tasksFactory, usersFactory) {
      this.tasksFactory = tasksFactory;
      this.usersFactory = usersFactory;
      this.users = null;

      this.initialize();
    }

    initialize() {
      this.getSupervisedTasks()
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
