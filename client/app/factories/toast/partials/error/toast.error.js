'use strict';

class toastErrorController {
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
            this.errorMessage = this.values.MESSAGES.ERROR;
        }
    }

}

angular.module('tasksAdminApp')
    .controller('toastErrorController', toastErrorController);

