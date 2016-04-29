'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    }
    
    openMenu($mdOpenMenu, ev) {
      let that = this;
      that.originatorEv = ev;
      $mdOpenMenu(ev);
  }
}

angular.module('tasksAdminApp')
  .controller('NavbarController', NavbarController);
