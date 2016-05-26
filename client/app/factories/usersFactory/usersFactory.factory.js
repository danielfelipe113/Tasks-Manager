
'use strict';
(function () {
    function usersFactory($http, Auth, dialogService, $q) {

        var me = null;
        var usersFactory = {
            getUsers: getUsers,
            getUserById: getUserById,
            getUsersByRole: getUsersByRole,
            updateUser: updateUser,
            deleteUser: deleteUser,
            createUsers: createUsers,
            getMe: getMe
        };

        return usersFactory;

        function getUsers() {
            return $http.get('/api/users');
        }
        function getUserById(id) {
            return $http.get('/api/users/' + id);
        }
        function getUsersByRole(role) {
            return $http.get('api/users/getUsersByRole/' + role);
        }
        function updateUser(id, user) {
            var tempUser = angular.toJson(user);
            return $http.put('api/users/' + id, tempUser);
        }
        function deleteUser(id) {
            return $http.delete('api/users/' + id);
        }
        function createUsers($event) {
            var template = './partials/createUser/createUser.html';
            var controller = 'createUserController';
            dialogService.showDialog($event, template, controller);
        }
        function getMe() {
            var deferred = $q.defer();

            $http.get('/api/users/me')
                .then(function (response) {                    
                    me = response.data;
                    deferred.resolve(me);
                });

            return deferred.promise;
        }
    }


    angular
        .module('tasksAdminApp.usersFactory')
        .factory('usersFactory', usersFactory);
})();








