(function () {
    'use strict';

    function models() {
        var service = {
            createEmptyTask: createEmptyTask,
            CreateEmptyUser: CreateEmptyUser
        };

        return service;

        function CreateEmptyUser() {
            this.firstName = null;
            this.lastName = null;
            this.fullName = null;
            this.role = null;
            this.supervisorOf = null;
            this.email = null;
            this.password = null;
            this.confirmPassword = null;
            this.isActive = null;
            this.tasks = [];
        }

        function createEmptyTask() {
            this.Title = null;
            this.Description = null;
            this.Comments = null;
            this.Status = null;
            this.Priority = null;
            this.AssignBy = null;
            this.AssignTo = null;
            this.DoBeforeDate = new Date();
            this.AssignDate = new Date();
            this.EstimatedHours = null;
            this.TimeSpent = null;
        }
    }
    angular
        .module('tasksAdminApp')
        .factory('models', models);
})();
