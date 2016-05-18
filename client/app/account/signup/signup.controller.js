'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, models, appConfig) {
    this.Auth = Auth;
    this.$state = $state;
    this.models = models;
    this.roles = appConfig.userRolesJson;
    this.user = null;

    this.initialize();
  }

  initialize() {
    this.CreateEmptyUser();
  }

  CreateEmptyUser() {
    this.user = new this.models.CreateEmptyUser();
  }



  register(form) {
    this.submitted = true;
    this.user.fullName = this.user.firstName + ' ' + this.user.lastName;
    this.user.isActive = true;


    if (form.$valid) {
      let tempUser = angular.toJson(this.user);
      this.Auth.createUser(tempUser)
        .then(() => {
          // Account created, redirect to home
          this.$state.go('tasksDashboard');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }
}

angular.module('tasksAdminApp')
  .controller('SignupController', SignupController);
