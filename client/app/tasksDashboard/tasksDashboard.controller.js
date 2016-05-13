'use strict';

(function () {

  class tasksDashboardController {
    constructor(tasksFactory, appConfig, Auth, usersFactory) {
      //dependences
      this.appConfig = appConfig;
      this.tasksFactory = tasksFactory;
      this.usersFactory = usersFactory;
      this.Auth = Auth;

      //variables
      this.algo = 'algoo'
      this.users = {};
      this.ownTasks = null;

      //init
      this.initialize();
    }
    initialize() {
      this.getMyself();
    }

    getMyself() {
      this.users.me = this.Auth.getCurrentUser().toJSON();
      this.getTasks(this.users.me, 'me');
      
      let tempUsers = this.users.me.userSupervisorOf;
      for (let i = 0; i < tempUsers.length; i++) {
        let userName = tempUsers[i].firstName;
        this.users[userName] = tempUsers[i];
        this.getTasks(tempUsers[i], userName);
      }
      console.log(this.users)
    }

    getTasks(user, variablePosition) {
      let tempTasks = null;
      let userId = user._id
      
      this.tasksFactory.getTasksByUserId(userId)
        .then((response) => {
          let tempTasks = response.data;
          console.log(tempTasks)
          this.organizeTasks(tempTasks, variablePosition)
        })
    }

    //primer parametro, la coleccion de tareas
    //segundo parametro, a que usuario se las debo asignar

    organizeTasks(tempTasks, userName) {
      this.users[userName].tasks = {
        InProgress: [],
        ToDoToday: [],
        ToDo: [],
        Delayed: [],
        Done: []
      };
      
      tempTasks.forEach(function (element) {
        if (element.Status.statusName === this.appConfig.tasksStatus.InProgress) {
          this.users[userName].tasks.InProgress.push(element);
        } else if (element.Status.statusName === this.appConfig.tasksStatus.ToDoToday) {
          this.users[userName].tasks.ToDoToday.push(element);
        } else if (element.Status.statusName === this.appConfig.tasksStatus.ToDo) {
          this.users[userName].tasks.ToDo.push(element);
        } else if (element.Status.statusName === this.appConfig.tasksStatus.Delayed) {
          this.users[userName].tasks.Delayed.push(element);
        } else if (element.Status.statusName === this.appConfig.tasksStatus.Done) {
          this.users[userName].tasks.Done.push(element);
        }
      }, this);
    }

  } //end

  angular.module('tasksAdminApp')
    .component('tasksDashboard', {
      templateUrl: 'app/tasksDashboard/tasksDashboard.html',
      controller: tasksDashboardController,
      controllerAs: 'vm'
    });

})();
