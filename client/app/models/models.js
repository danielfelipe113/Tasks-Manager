(function () {
    'use strict';

    function models() {
        var service = {
            createEmptyTask: createEmptyTask,
            CreateEmptyUser: CreateEmptyUser
        };

        return service;

        function CreateEmptyUser() {
            this.Id = 0;
            this.FirstName = null;
            this.LastName = null;
            this.IsActive = null;
            this.password = null;
            this.email = null;
            this.rol = null;
            this.UserSupervisors = [];
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
