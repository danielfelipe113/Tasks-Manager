(function () {
    'use strict';

    angular
        .module('tasksAdminApp')
        .service('dialogService', dialogService);

    dialogService.$inject = ['$mdDialog'];

    function dialogService($mdDialog) {
        this.showDialog = showDialog;
        
        function showDialog($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: './app/factories/dialogService/partials/createTask/createTask.html',
                fullscreen: true,
                disableParentScroll: true,
                clickOutsideToClose: true,
                controller: createTaskController,
                controllerAs: 'vm',
                locals: {
                    items: null
                }
            });
        }
        // function openDialog(model) {
        //     var modalInstance = $modal.open({
        //         templateUrl: model.templateUrl,
        //         controller: model.controller,
        //         controllerAs: 'vm',
        //         size: model.size,
        //         windowClass: model.windowClass,
        //         resolve: {
        //             model: function () {
        //                 return model.returnVm;
        //             }
        //         },
        //         backdrop: 'static'
        //     });

        //     modalInstance.result.then(
        //         function (response) {
        //             if (model.callback) {
        //                 model.callback(response);
        //             }
        //             if (model.gridName) {
        //                 kendoService.refreshGrid(model.gridName);
        //             }
        //         },
        //         function () {
        //             if (model.callbackDismiss) {
        //                 model.callbackDismiss();
        //             }
        //         });
        // }

        function modalObject(templateUrl, controller, size, returnVm, gridName, callback, callbackDismiss, windowClass) {
            this.templateUrl = templateUrl;
            this.controller = controller;
            this.size = size;
            this.returnVm = returnVm;
            this.gridName = gridName;
            this.callback = callback;
            this.callbackDismiss = callbackDismiss;
            this.windowClass = windowClass;
            return this;
        }
    }
})();