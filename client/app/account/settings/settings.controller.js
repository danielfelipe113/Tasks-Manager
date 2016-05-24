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
    let that = this;
    let tempUser = null;

    this.usersFactory.getMe()
      .then((response) => {
        tempUser = response;
        
        that.usersFactory.getUserById(tempUser._id)
          .then(response => {
            that.user = response.data;
          });
      });
  }

  saveUser(isValid) {
    this.user.fullName = this.user.firstName + ' ' + this.user.lastName;

    let that = this;
    if (isValid) {
      this.usersFactory.updateUser(this.user._id, this.user)
        .then(() => {
          that.getUser();
          that.toastFactory.successToast(that.values.MESSAGES.USERS.SAVESUCCESS);
        })
        .catch(() => {
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
          this.message = 'Contraseña cambiada satsifactoriamente';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Contraseña incorrecta';
          this.message = '';
        });
    }
  }
}

angular.module('tasksAdminApp')
  .controller('SettingsController', SettingsController);
