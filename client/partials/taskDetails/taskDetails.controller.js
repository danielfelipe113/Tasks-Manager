'use strict';
(function () {
    class taskDetailsController {
        constructor(commonFactory, $state, tasksFactory) {
            this.task = null;
            this.$state = $state;
            this.commonFactory = commonFactory;
            this.tasksFactory = tasksFactory;
            this.DoBeforeDate = null;
            this.AssignDate = null;

            this.initialize();
        }

        initialize() {
            this.getTask();
        }

        getTask() {
            let that = this;
            this.tasksFactory.getTaskById(this.$state.params.id)
                .then((res) => {
                    this.task = res.data;
                    this.DoBeforeDate = this.commonFactory.toJSONLocal(this.task.DoBeforeDate);
                    this.AssignDate = this.commonFactory.toJSONLocal(this.task.AssignDate);
                });
        }



    }

    angular.module('tasksAdminApp')
        .component('taskDetails', {
            templateUrl: 'partials/taskDetails/taskDetails.html',
            controller: taskDetailsController,
            controllerAs: 'vm'
        });

})();
