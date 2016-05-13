'use strict';

class toastSuccessController {
    constructor(values, message) {
        this.values = values.values();
        this.message = message;
        this.successMessage = null;
        
        this.initialize();
    }

    initialize() {
        if(this.message) {
            this.successMessage = this.message;
        } else {
            this.successMessage = this.values.MESSAGES.SUCCESS;
        }
    }

}

angular.module('tasksAdminApp')
    .controller('toastSuccessController', toastSuccessController);

