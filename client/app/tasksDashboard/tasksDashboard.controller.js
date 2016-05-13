'use strict';
/**
 * Pasar las funciones a la factory
 */
(function () {

  class tasksDashboardController {
    constructor(tasksFactory, appConfig, Auth, usersFactory, $stateParams) {
      //dependences
      this.userId = $stateParams.id;
      this.appConfig = appConfig;
      this.tasksFactory = tasksFactory;
      this.usersFactory = usersFactory;
      this.Auth = Auth;

      //variables
      this.users = {};
      this.ownTasks = null;

      //init
      this.initialize();
    }
    initialize() {
      console.log('params: ', this.userId)
      this.getTasks(this.userId);
      
    }

    getTasks(id) {
     this.tasksFactory.getTasksConstructor(id)
      .then(response => {
        if(id) {
          this.users = response;
          if(this.users.hasOwnProperty('me')) {
            delete this.users['me']
          };  
        } else {
          this.users.me = response['me']
        }
        console.log('users: ', this.users)
      });
        
    }



  } //end

  angular.module('tasksAdminApp')
    .component('tasksDashboard', {
      templateUrl: 'app/tasksDashboard/tasksDashboard.html',
      controller: tasksDashboardController,
      controllerAs: 'vm'
    });

})();
