(function () {
    'use strict';

    angular
        .module('tasksAdminApp')
        .factory('models', models);

    function models() {
        var service = {
            Callback: Callback,
        };

        return service;

        function task() {
            this.Id = 0;
            this.Title = '';
            this.Description = '';
            this.Comments = '';
            this.Priority = number;
            this.AssignBy = '';
            this.AssignTo = '';
            this.DoBeforeDate = null;
            this.AssignDate = null;
            this.EstimatedHours = null;
            this.TimeSpent = number;
        }
    }
})();