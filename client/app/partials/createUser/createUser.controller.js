'use strict';

class createUserController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, models, appConfig, $mdDialog, toastFactory, values) {
    this.Auth = Auth;
    this.$mdDialog = $mdDialog;
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
    console.log(this.user)
  }



  register(form) {
    let that = this;
    this.submitted = true;
    this.user.fullName = this.user.firstName + ' ' + this.user.lastName;
    this.user.isActive = true;


    if (form.$valid) {
      this.Auth.createUser(this.user)
        .then((res) => {
          that.toastFactory.successToast(that.values.MESSAGES.USERS.SAVESUCCESS);
          that.$mdDialog.hide();
        })
        .catch(err => {
          that.toastFactory.errorToast(that.values.MESSAGES.ERROR);
          that.$mdDialog.cancel();
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
  
  closeDialog() {
    this.$mdDialog.cancel();
  }

}

angular.module('tasksAdminApp')
  .controller('createUserController', createUserController);
