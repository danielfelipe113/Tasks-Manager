(function () {
    'use strict';

    angular
        .module('tasksAdminApp')
        .factory('models', models);

    function models() {
        var service = {
            createEmptyTask: createEmptyTask,
            createTaskModel: createTaskModel
        };

        return service;

        function createEmptyTask() {
            this.Id = 0;
            this.Title = null;
            this.Description = null;
            this.Comments = null;
            this.Priority = null;
            this.AssignBy = null;
            this.AssignTo = null;
            this.DoBeforeDate = null;
            this.AssignDate = null;
            this.EstimatedHours = null;
            this.TimeSpent = null;
        }

        function createTaskModel() {
            this.Priority = [
                {
                    textual: 'Low',
                    number: 1,
                    icon: {
                        name: 'bookmark_border',
                        class: 'priorityLow'
                    }
                },
                {
                    textual: 'Medium',
                    number: 2,
                    icon: {
                        name: 'bookmark',
                        class: 'priorityMedium'
                    }
                },
                {
                    textual: 'High',
                    number: 3,
                    icon: {
                        name: 'warning',
                        class: 'priorityHigh'
                    }
                }
            ];
            this.AssignBy = [
                {
                    name: 'Daniel',
                    lastName: 'Gonzales',
                    charge: 'SuperAdmin'
                },
            ];
            this.AssignTo = [
                {
                    name: 'Daniel',
                    lastName: 'Coy',
                    charge: 'Admin'
                },
                {
                    name: 'Felipe',
                    lastName: 'Triana',
                    charge: 'Admins'
                },
                {
                    name: 'Andira',
                    lastName: 'Coy',
                    charge: 'Employee'
                }
            ];
            this.DoBeforeDate = new Date();
            this.AssignDate = new Date();
        }
    }
})();