
'use strict';
(function () {
    function tasksFactory($http, $q, appConfig, usersFactory, dialogService, $state, $interval, values) {

        if(sessionStorage.getItem('reviewedForDelayed') !== 'true') {
            reviewedForDelayed();
        }

        function reviewedForDelayed() {
            var sessionStorage = window.sessionStorage;
            sessionStorage.setItem('reviewedForDelayed', 'true')
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


        var tasksFactory = {
            getTasks: getTasks,
            getTasksByUserId: getTasksByUserId,
            createTasks: createTasks,
            getTasksByStatus: getTasksByStatus,
            getTaskById: getTaskById,
            postTask: postTask,
            putTask: putTask,
            deleteTask: deleteTask,
            getTasksConstructor: getTasksConstructor
        }

        return tasksFactory


        function getTasks() {
            return $http.get('/api/tasks');
        }

        function getTasksByUserId(userId) {
            return $http.get('/api/tasks/byUserId/' + userId);
        }

        function getTaskById(id) {
            return $http.get('/api/tasks/' + id);
        }

        function postTask(task) {
            var tempTask = task;
            if(typeof task === 'object') {
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
            var that = this;
            var template = './app/partials/createTask/createTask.html';
            var controller = 'createTaskController';

            function callback(state) {
                var goToState = state || 'tasksDashboard';
                $state.go(goToState, {}, {
                    reload: true
                })
            }

            dialogService.showDialog($event, template, controller, null, callback);
        }


        //por ahora solo toma las tareas de 1 solo usuario y si se manda un array de Ids hace un for y hace varios gets, debo corregir eso en el server
        /**
         * Paso el id de mi usuario principal, esta función hace get a el usuario, toma el array de usuarios de los que el usuario principal es supervisor y 
         * va haciendo gets de las tareas de cada usuario mientras las acomoda en un nuevo objeto ordenado por nombre
         * retorna el objeto con las tareas totalmente ordenadas
         */

        function getTasksByStatus(userId, status) {
            return $http.get('/api/tasks/byStatus/' + userId + '/' + status);
        }

        function getTasksConstructor(id, getSupervised) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var users = {};
            var tempTasks = null;

            if (id) { //Busco las tareas del usuario que yo superviso y que ya seleccioné 
                usersFactory.getUserById(id)
                    .then(function (response) {
                        users.user = response.data;
                        getTasks(users.user._id, 'user')
                    });
            } else if (getSupervised) { //Busco todos los usuarios que yo superviso y sus tareas
                var tempUser = null;
                usersFactory.getMe()
                    .then(function (response) {
                        tempUser = response;
                        usersFactory.getUserById(tempUser._id)
                            .then(function (response) {
                                users.user = response.data;
                                getUsersSupervised('user');
                            });
                    });

            } else { //busco mis propias tareas
                var tempUser = null;
                usersFactory.getMe()
                    .then(function (response) {
                        tempUser = response
                        usersFactory.getUserById(tempUser._id)
                            .then(function (response) {
                                users.user = response.data;
                                getTasks(users.user._id, 'user')
                            });
                    })
            }

            function getUsersSupervised(variablePosition) { //establezco a quien superviso y hago llamados de sus tareas
                var supervisorOf = users[variablePosition].supervisorOf;
                if (supervisorOf != null) {
                    for (var i = 0; i < supervisorOf.length; i++) {
                        var userName = supervisorOf[i].firstName + supervisorOf[i].lastName + supervisorOf[i].role;
                        users[userName] = supervisorOf[i];
                        getTasks(supervisorOf[i]._id, userName);
                    }
                }
            }

            function getTasks(userId, variablePosition) {
                getTasksByUserId(userId)
                    .then(function (response) {
                        var tempTasks = response.data;
                        organizeTasks(tempTasks, variablePosition)
                    })
                    .catch(function (err) {
                        console.log(err)
                    });
            }

            function organizeTasks(tempTasks, userName, usersToFind) { //hago map de las tareas
                users[userName].tasks = {
                    InProgress: [],
                    ToDoToday: [],
                    ToDo: [],
                    Delayed: [],
                    Done: []
                };
                users[userName].totalTasks = 0;
                users[userName].haveTasks = false;
                tempTasks.forEach(function (element) {

                    if (element.Status.statusName === appConfig.tasksStatus.InProgress) {
                        users[userName].tasks.InProgress.push(element);
                    } else if (element.Status.statusName === appConfig.tasksStatus.ToDoToday) {
                        users[userName].tasks.ToDoToday.push(element);
                    } else if (element.Status.statusName === appConfig.tasksStatus.ToDo) {
                        users[userName].tasks.ToDo.push(element);
                    } else if (element.Status.statusName === appConfig.tasksStatus.Delayed) {
                        users[userName].tasks.Delayed.push(element);
                    } else if (element.Status.statusName === appConfig.tasksStatus.Done) {
                        users[userName].tasks.Done.push(element);
                    }

                });
                for (var taskStatus in users[userName].tasks) {
                    if (users[userName].tasks[taskStatus].length) {
                        users[userName].haveTasks = true;
                        users[userName].totalTasks += users[userName].tasks[taskStatus].length;
                    }
                }
                deferred.resolve(users);
            }
            return promise;
        }
    };

    angular
        .module('tasksAdminApp.tasksFactory')
        .factory('tasksFactory', tasksFactory);
})();







