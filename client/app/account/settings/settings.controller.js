'use strict';

class SettingsController {
  constructor(Auth, usersFactory, toastFactory, values) {
    this.errors = {};
    this.submitted = false;
    this.toastFactory = toastFactory;
    this.usersFactory = usersFactory;
    this.values = values.values();
    this.Auth = Auth;
    this.user = null;
    //init
    this.initialize();
  }

  initialize() {
    this.getUser();

  }

  getUser() {
    console.log('getting')
    let tempUser = this.Auth.getCurrentUser().toJSON();
    
    this.usersFactory.getUserById(tempUser._id)
      .then(response => {
        this.user = response.data;
        console.log(response)
      })
  }
  
  saveUser(isValid) {
        this.user.fullName = this.user.firstName + ' ' + this.user.lastName;
        
        let that = this;
        if (isValid) {
            this.usersFactory.updateUser(this.user._id, this.user)
                .then((res) => {
                  that.getUser();
                  that.toastFactory.successToast(that.values.MESSAGES.USERS.SAVESUCCESS);
                })
                .catch((err) => {
                    that.toastFactory.errorToast(that.values.MESSAGES.ERROR);
                });
        }
        return false;
    }
  

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}

angular.module('tasksAdminApp')
  .controller('SettingsController', SettingsController);
