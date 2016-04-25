
'use strict';
(function () {
    function tasksFactory($http) {
        return {
            getTasks: function () {
                return $http.get('http://api.randomuser.me/?results=4');
            }
        };


    }


    angular
        .module('tasksAdminApp.tasksFactory')
        .factory('tasksFactory', tasksFactory);
})();








