'use strict';

class SidenavController {
    constructor(Auth, $mdSidenav, dialogService, $state) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.$state = $state;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;
        this.$mdSidenav = $mdSidenav;
        this.dialogService = dialogService;
    }
    
    createUser($event) {
        let that = this;
        let template = './app/partials/createUser/createUser.html';
        let controller = 'createUserController';
        
        this.dialogService.showDialog($event, template, controller);            
    }
    
    createTask($event) {
        let that = this;
        let template = './app/partials/createTask/createTask.html';
        let controller = 'createTaskController';
        
        function callback() {
            that.$state.go('tasksDashboard', {}, {
                reload: true
            })
        }
        
        this.dialogService.showDialog($event, template, controller, null, callback);            
    }
    
    isSidenavLeftOpen() {
        return this.$mdSidenav('left').isOpen();
    }
    
    toggleLeftSidenav() {
        this.$mdSidenav('left').toggle();
    }
}

angular.module('tasksAdminApp')
    .controller('SidenavController', SidenavController);
