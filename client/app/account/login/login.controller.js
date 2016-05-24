'use strict';

class LoginController {
  constructor(Auth, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
  }

  login(isValid) {
    this.submitted = true;

    if (isValid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('tasksDashboard');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('tasksAdminApp')
  .controller('LoginController', LoginController);
