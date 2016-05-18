
'use strict';
(function () {
    function usersFactory($http, Auth, dialogService) {
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
                var tempUser = angular.toJson(user);
                return $http.patch('api/users/' + id, tempUser);
            },
            deleteUser: (id) => {
                return $http.delete('api/users/' + id);
            },
            createUsers($event) {
                let template = './app/partials/createUser/createUser.html';
                let controller = 'createUserController';
                dialogService.showDialog($event, template, controller);
            }
        };
    }


    angular
        .module('tasksAdminApp.usersFactory')
        .factory('usersFactory', usersFactory);
})();








