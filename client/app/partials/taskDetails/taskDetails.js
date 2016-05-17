'use strict';

class taskDetailsController {
    constructor(dataModel, usersFactory, $mdDialog) {
        this.task = dataModel;
        this.$mdDialog = $mdDialog;
        this.DoBeforeDate = this.toJSONLocal(this.task.DoBeforeDate);
        this.AssignDate = this.toJSONLocal(this.task.AssignDate);  
        console.log(this.task)
        

        let date = this.toJSONLocal(this.task.AssignDate);
                
               
        console.log(typeof date)
    }

    toJSONLocal(date) {
        var local = new Date(date);
        //local.setMinutes(date.getMinutes() - date.getTimezoneOffset()); --> To normalize dates with timezone - http://stackoverflow.com/a/11172083
        return local.toJSON().slice(0, 10);
    }

    closeDialog() {
        this.$mdDialog.cancel();
    }

}

angular.module('tasksAdminApp')
    .controller('taskDetailsController', taskDetailsController);

