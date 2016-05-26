'use strict';
(function () {
  class createUserController {
    //start-non-standard
    user = {};
    errors = {};
    submitted = false;
    //end-non-standard

    constructor(Auth, $state, models, appConfig, toastFactory, values) {
      this.Auth = Auth;
      this.values = values.values();
      this.toastFactory = toastFactory;
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
      let that = this;
      this.submitted = true;
      this.user.fullName = this.user.firstName + ' ' + this.user.lastName;
      this.user.isActive = true;


      if (form.$valid) {
        this.Auth.createUser(this.user)
          .then(() => {
            that.toastFactory.successToast(that.values.MESSAGES.USERS.SAVESUCCESS);
            that.$state.go('tasksDashboard')
          })
          .catch(err => {
            that.toastFactory.errorToast(that.values.MESSAGES.ERROR);
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
    .component('createUsers', {
      templateUrl: 'partials/createUser/createUser.html',
      controller: createUserController,
      controllerAs: 'vm'
    });

})();
