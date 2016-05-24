
'use strict';
(function () {
    function tasksFactory($http, $q, appConfig, usersFactory, dialogService, $state, $interval, values) {
        if (sessionStorage.getItem('reviewedForDelayed') !== 'true') {
            reviewedForDelayed();
        }
                
        var tasksFactoryMethods = {
            getTasks: getTasks,
            getTasksByStatus: getTasksByStatus,
            getTaskById: getTaskById,
            getSupervisedTasks: getSupervisedTasks,
            createTasks: createTasks,
            postTask: postTask,
            putTask: putTask,
            deleteTask: deleteTask
        };

        return tasksFactoryMethods;


        function getTasks(id, justLength) {
            return $http.get('api/tasks/getTasks/' + id + '/' + justLength);
        }

        function getTaskById(id) {
            return $http.get('/api/tasks/' + id);
        }

        function getTasksByStatus(userId, status) {
            return $http.get('/api/tasks/byStatus/' + userId + '/' + status);
        }

        function postTask(task) {
            var tempTask = task;
            if (typeof task === 'object') {
                tempTask = [];
                tempTask[0] = task;
            }
            return $http.post('/api/tasks', tempTask);
        }

        function putTask(task) {
            return $http.put('/api/tasks/', task);
        }

        function deleteTask(id) {
            return $http.delete('/api/tasks/' + id);
        }

        function createTasks($event) {
            var template = './app/partials/createTask/createTask.html';
            var controller = 'createTaskController';

            function callback(state) {
                var goToState = state || 'tasksDashboard';
                $state.go(goToState, {}, {
                    reload: true
                });
            }

            dialogService.showDialog($event, template, controller, null, callback);
        }

        function getSupervisedTasks() {
            //traer array de usuarios supervisados y pasarlo al API
            var deferred = $q.defer();
            var me = null;
            var users = [];
            usersFactory.getMe()
                .then(function (res) {
                    me = res;
                    getUsersTasks();
                    deferred.resolve(users);
                });


            function getUsersTasks() {
                for (var i = 0; i < me.supervisorOf.length; i++) {
                    var userSupervisedId = me.supervisorOf[i]._id;
                    $http.get('api/tasks/getTasks/' + userSupervisedId + '/' + true)
                        .then(function (response) {
                            users.push(response.data);
                        });
                }
            }
            return deferred.promise;
        }
        //Revisar si hay tareas retrasadas
        
        function reviewedForDelayed() {
            var sessionStorage = window.sessionStorage;
            sessionStorage.setItem('reviewedForDelayed', 'true');
            var status = values.getStatus();
            getTasks()
                .then(function (response) {
                    var tasks = response.data;
                    var tempTasks = [];
                    var actualTime = new Date();
                    var taskTime = null;
                    for (var i = 0; i < tasks.length; i++) {
                        taskTime = new Date(tasks[i].DoBeforeDate);
                        if (tasks[i].Status.statusName === 'ToDo' || tasks[i].Status.statusName === 'ToDoToday') { //need to be fixed
                            if (actualTime > taskTime) {
                                tasks[i].Status = status[3]; // == delayed, need to be fixed - quitar numero
                                tempTasks.push(tasks[i]);
                            }
                        }
                    }
                    putTask(tempTasks);
                });
        }


    }



    angular
        .module('tasksAdminApp.tasksFactory')
        .factory('tasksFactory', tasksFactory);
})();







