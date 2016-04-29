(function () {
    'use strict';

    angular
        .module('tasksAdminApp')
        .service('dialogService', dialogService);

    dialogService.$inject = ['$mdDialog'];

    function dialogService($mdDialog) {
        var dialogService = {
            showDialog: showDialog
        }

        return dialogService;
        
        function showDialog($event, template, controller, task, successCallback, dismissCallback) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: template,
                fullscreen: true,
                disableParentScroll: true,
                clickOutsideToClose: true,
                controller: controller,
                controllerAs: 'vm',
                onComplete: successCallback,
                onRemoving: dismissCallback,
                locals: {
                    task: task || null
                }
            });
        }
    }
})();