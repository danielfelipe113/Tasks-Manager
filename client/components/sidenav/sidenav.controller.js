'use strict';

class SidenavController {
    constructor(Auth, $mdSidenav, tasksFactory, usersFactory) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser();
        this.$mdSidenav = $mdSidenav;
        this.usersFactory = usersFactory;
        this.tasksFactory = tasksFactory;
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
