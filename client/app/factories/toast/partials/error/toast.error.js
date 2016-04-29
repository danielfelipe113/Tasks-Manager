'use strict';

class toastSuccessController {
    constructor(values, message) {
        this.values = values.values();
        this.message = message;
        this.errorMessage = null;
        
        this.initialize();
    }

    initialize() {
        if(this.message) {
            this.errorMessage = this.message;
        } else {
            this.errorMessage = this.values.MESSAGES.TASK.ERROR;
        }
    }

}

angular.module('tasksAdminApp')
    .controller('toastSuccessController', toastSuccessController);

