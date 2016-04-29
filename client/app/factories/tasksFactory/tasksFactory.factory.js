
'use strict';
(function () {
    function tasksFactory($http) {
        return {
            getTasks: () => {
                return $http.get('/api/tasks');
            },
            getTasksByStatus: () => {
                return $http.get('/api/tasks');
            },
            getTaskById: (id) => {
                return $http.get('/api/tasks/' + id);
            },
            postTask: (task) => {
                return $http.post('/api/tasks', task);
            },
            putTask: (id, task) => {
                return $http.put('/api/tasks/' + id, task);
            },
            deleteTask: (id) => {
                return $http.delete('/api/tasks/' + id);
            }
        };
    }

    angular
        .module('tasksAdminApp.tasksFactory')
        .factory('tasksFactory', tasksFactory);
})();








