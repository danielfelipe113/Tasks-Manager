'use strict';

class SidenavController {
    constructor(Auth, $mdSidenav, tasksFactory, usersFactory) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.isEmployee = Auth.isEmployee;
        this.getCurrentUser = null;
        this.$mdSidenav = $mdSidenav;
        this.usersFactory = usersFactory;
        this.tasksFactory = tasksFactory;
        
    }
    
    initialize() {
        console.log('sidenav')
        this.getMe();
    }
    
    createUser($event) {
        this.usersFactory.createUsers($event);            
    }
    
    createTask($event) {
        this.tasksFactory.createTasks($event);
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
