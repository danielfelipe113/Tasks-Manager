'use strict';
(function () {

  class UsersComponent {
    constructor(Auth, tasksFactory) {
      this.Auth = Auth;
      this.tasksFactory = tasksFactory;
      this.users = null;
      this.initialize();
    }

    initialize() {
      this.getUsers();
    }
    
    getUsers() {
      this.tasksFactory.getTasksConstructor(0, true)
        .then(res =>{          
          this.users = res;
          if(this.users.hasOwnProperty('me')) {
            delete this.users['me']
          };
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
