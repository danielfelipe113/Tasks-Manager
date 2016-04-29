
'use strict';
(function () {
    function usersFactory($http) {
        return {
            getUsers: () => {
                return $http.get('/api/users');
            },
            getUserById: (id) => {
                return $http.get('/api/users' + id);
            }
        };
    }


    angular
        .module('tasksAdminApp.usersFactory')
        .factory('usersFactory', usersFactory);
})();








