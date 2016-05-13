(function () {
    'use strict';

    angular
        .module('tasksAdminApp')
        .service('dialogService', dialogService);

    dialogService.$inject = ['$mdDialog', '$state'];

    function dialogService($mdDialog, $state) {
        var dialogService = {
            showDialog: showDialog
        }

        return dialogService;

        function showDialog($event, template, controller, dataModel, successCallback, dismissCallback) {
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
                locals: {
                    dataModel: dataModel || null
                }
            })
                .then(() => {
                    successCallback()
                })
                .catch(() => {
                    if(dismissCallback) {
                        dismissCallback();
                    }
                });
        }
    }
})();