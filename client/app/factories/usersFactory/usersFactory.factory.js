
'use strict';
(function () {
    function usersFactory($http, Auth) {
        return {
            getUsers: () => {
                return $http.get('/api/users');
            },
            getUserById: (id) => {
                return $http.get('/api/users/' + id);
            },
            getUsersByRole: (role) => {
                return $http.get('api/users/getUsersByRole/' + role);
            },
            updateUser: (id, user) => {
                return $http.patch('api/users/' + id, user);
            },
            deleteUser: (id) => {
                return $http.delete('api/users/' + id);
            }
        };
    }


    angular
        .module('tasksAdminApp.usersFactory')
        .factory('usersFactory', usersFactory);
})();








