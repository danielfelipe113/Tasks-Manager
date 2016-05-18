'use strict';

class taskDetailsController {
    constructor(commonFactory, dataModel, usersFactory, $mdDialog) {
        this.task = dataModel;
        this.$mdDialog = $mdDialog;
        this.DoBeforeDate = commonFactory.toJSONLocal(this.task.DoBeforeDate);
        this.AssignDate = commonFactory.toJSONLocal(this.task.AssignDate);  
    }


    closeDialog() {
        this.$mdDialog.cancel();
    }

}

angular.module('tasksAdminApp')
    .controller('taskDetailsController', taskDetailsController);

