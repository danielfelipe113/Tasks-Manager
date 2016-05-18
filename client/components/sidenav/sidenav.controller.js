'use strict';

class SidenavController {
    constructor(Auth, $mdSidenav, tasksFactory, usersFactory) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = null;
        this.$mdSidenav = $mdSidenav;
        this.usersFactory = usersFactory;
        this.tasksFactory = tasksFactory;
        
    }
    
    initialize() {
        this.getMe();
    }
    
    getMe() {
        this.usersFactory.getMe()
            .then((response) => {
                this.getCurrentUser = response;
                console.log('Este soy yo, desde sidenav: ', this.me)
            })
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
