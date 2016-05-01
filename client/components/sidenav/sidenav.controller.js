'use strict';

class SidenavController {
    //start-non-standard
    menu = [{
        'title': 'Home',
        'state': 'main'
    }];
    //end-non-standard

    constructor(Auth, $mdSidenav, dialogService, $state) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.$state = $state;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;
        this.$mdSidenav = $mdSidenav;
        this.dialogService = dialogService;
    }
    
    createTask($event) {
        let that = this;
        let template = './app/partials/createTask/createTask.html';
        let controller = 'createTaskController';
        
        function callback() {
            that.$state.go('main', {}, {
                reload: true,
                inherit: false,
                notify: true
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
