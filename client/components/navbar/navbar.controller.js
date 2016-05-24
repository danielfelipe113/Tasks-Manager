'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'tasksDashboard'
  }];
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.currentUser = Auth.getCurrentUser();;
    
    }
    
    openMenu($mdOpenMenu, ev) {
      let that = this;
      that.originatorEv = ev;
      $mdOpenMenu(ev);
  }
}

angular.module('tasksAdminApp')
  .controller('NavbarController', NavbarController);
