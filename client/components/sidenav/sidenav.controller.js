'use strict';

class SidenavController {
    //start-non-standard
    menu = [{
        'title': 'Home',
        'state': 'main'
    }];
    //end-non-standard

    constructor(Auth, $mdSidenav, dialogService) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;
        this.$mdSidenav = $mdSidenav;
        this.dialogService = dialogService;
    }
    
    createTask($event) {
        let template = './app/factories/dialogService/partials/createTask/createTask.html';
        let controller = 'createTaskController';
        this.dialogService.showDialog($event, template, controller, null);
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
