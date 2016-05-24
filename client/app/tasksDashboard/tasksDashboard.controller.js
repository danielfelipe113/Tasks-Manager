'use strict';
/**
 * Pasar las funciones a la factory
 */
(function () {

  class tasksDashboardController {
    constructor(tasksFactory, appConfig, Auth, usersFactory, $stateParams) {
      //dependences
      this.userId = $stateParams.id;
      this.tasksFactory = tasksFactory;
      this.usersFactory = usersFactory;

      //variables
      this.tasks = {};

      //init
      this.initialize();
    }
    initialize() {
      if (this.userId) {
        this.getUserById();
      } else {
        this.getMe()
      }
    }

    getUserById() {
      this.usersFactory.getUserById(this.userId)
        .then(response => {
          this.currentUser = response.data;
          this.getTasks(this.currentUser._id);
        })
    }

    getMe() {
      this.usersFactory.getMe()
        .then((response) => {
          this.currentUser = response;
          this.getTasks(this.currentUser._id);
        });
    }

    getTasks(id) {
      this.tasksFactory.getTasks(id, true)
        .then(response => {
          this.tasks = response.data;
        })
        .catch(err => {
          console.log(err)
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
