'use strict';

class userDetailsController {
    constructor(dataModel, usersFactory, $mdDialog) {
        this.user = dataModel;
        this.$mdDialog = $mdDialog;
    }
    
    closeDialog() {
        this.$mdDialog.cancel();
    }
    
}

angular.module('tasksAdminApp')
    .controller('userDetailsController', userDetailsController);

