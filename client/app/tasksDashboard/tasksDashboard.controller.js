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
      this.user = {};
      
      this.id = this.user._id
     
      //init
      this.initialize();
    }
    initialize() {
      this.tasksFactory.getTasksByUserId("57364c8570b247b0057b8ec8")
        .then(res => {
          console.log(res)
        })
      
      
      
      this.getTasks(this.userId);
    }

    getTasks(id) {
      this.tasksFactory.getTasksConstructor(id, false)
        .then(response => {
          this.user = response.user
          console.log(response)
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
