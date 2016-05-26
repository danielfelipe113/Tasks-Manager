'use strict';
/**
 * tengo que revisar los endpoints porque no me están encontrando las tareas del usuario por el Id
 * 
 */

class confirmController {
    constructor($mdDialog, dataModel, values) { 
        this.$mdDialog = $mdDialog; 
        this.dataModel = dataModel;
        this.values = values.values();
        this.message = null;
              
        this.initialize();
    }
    
    initialize() {
        if(this.dataModel ===  this.values.CONFIRM.TYPE.TASK) {
             this.message = this.values.CONFIRM.REMOVETASK;
        } else if(this.dataModel ===  this.values.CONFIRM.TYPE.USER) {
            this.message = this.values.CONFIRM.REMOVEUSER;
        }
    }

    confirm() {
        this.$mdDialog.hide();
    }

    closeDialog() {
        this.$mdDialog.cancel();
    }
}

angular.module('tasksAdminApp')
    .controller('confirmController', confirmController);

