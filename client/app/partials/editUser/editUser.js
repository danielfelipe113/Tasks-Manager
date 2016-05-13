'use strict';

class editUserController {
    constructor(dataModel, $mdDialog, appConfig, usersFactory, toastFactory, values) {
        //dependencies
        this.toastFactory = toastFactory;
        this.values = values.values();
        this.usersFactory = usersFactory;
        this.$mdDialog = $mdDialog;
        
        //vars
        this.users = null;
    
        this.roles = appConfig.userRolesJson;
        this.user = dataModel;
        //init
        this.initialize();
    }

    initialize() {
        //methods
        this.getUsers();    
        
    }
    
    getUsers() {
        this.users = null;
        if(this.user.role !== this.roles.Employee) {
            this.usersFactory.getUsers()
                .then((res) => {
                this.users = res.data;
                });
        };
    }
    
    //submit
    saveForm(isValid) {
        this.user.fullName = this.user.firstName + ' ' + this.user.lastName;
        let that = this;
        
        if (isValid) {
            this.usersFactory.updateUser(this.user._id, this.user)
                .then((res) => {
                    that.toastFactory.successToast(that.values.MESSAGES.USERS.SAVESUCCESS);
                    that.$mdDialog.hide();
                })
                .catch((err) => {
                    that.toastFactory.errorToast(that.values.MESSAGES.ERROR);
                    that.$mdDialog.cancel();
                });
        }
        return false;
    }

    closeDialog() {
        this.$mdDialog.cancel();
    }
}

angular.module('tasksAdminApp')
    .controller('editUserController', editUserController);

