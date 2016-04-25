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
        this.$mdSidenav = $mdSidenav
        this.dialogService = dialogService
    }
    
    openDialog($event) {
        this.dialogService.showDialog($event)
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
