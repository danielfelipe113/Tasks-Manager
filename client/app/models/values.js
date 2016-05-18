(function () {
    'use strict';

    angular
        .module('tasksAdminApp')
        .factory('values', values);

    function values() {
        var service = {
            getPriorities: getPriorities,
            getStatus: getStatus,
            values: values
        };
        
        function values() {
            var values = {
                MESSAGES: {
                    SUCCESS: 'Proceso completado',
                    ERROR: 'Hubo un error, por favor contacte al administrador',
                    USERS: {
                        CREATESUCCESS: 'El usuario fue creado satisfactoriamente',
                        SAVESUCCESS: 'El usuario fue guardado satisfactoriamente',
                        DELETESUCCESS: 'El usuario fue eliminado satisfactoriamente'
                    },
                    TASKS: {
                        CREATESUCCESS: 'La tarea se creó satisfactoriamente',
                        SAVESUCCESS: 'La tarea fue guardada satisfactoriamente',
                        DELETESUCCESS: 'La tarea fue eliminada satisfactoriamente'                    
                    }
                },
                CONFIRM: {
                    TYPE: {
                        USER: 'USER',
                        TASK: 'TASK'
                    },
                    REMOVEUSER: '¿Está seguro que desea eliminar permanentemente el usuario?',
                    REMOVETASK: '¿Está seguro que desea eliminar permanentemente la tarea?'
                }
            };
            
            return values;
        }

        return service;

        function getPriorities() {
            var Priorities = [
                {
                    priorityName: 'Baja',
                    priorityNumber: 1,
                    priorityIcon: {
                        iconName: 'bookmark_border',
                        iconClass: 'priorityLow'
                    }
                },
                {
                    priorityName: 'Media',
                    priorityNumber: 2,
                    priorityIcon: {
                        iconName: 'bookmark',
                        iconClass: 'priorityMedium'
                    }
                },
                {
                    priorityName: 'Alta',
                    priorityNumber: 3,
                    priorityIcon: {
                        iconName: 'warning',
                        iconClass: 'priorityHigh'
                    }
                }
            ];
            
            return Priorities
        }

        function getStatus() {
            var Status = [
                {
                    statusCode: 0,
                    statusName: 'ToDo',
                    statusDescription: 'Por hacer',
                    statusIcon: {
                        iconName: 'warning',
                        iconClass: 'tasksToDo'
                    }
                },
                {
                    statusCode: 1,
                    statusName: 'ToDoToday',
                    statusDescription: 'Por hacer hoy',
                    statusIcon: {
                        iconName: 'assignment_ind',
                        iconClass: 'tasksToDoToday'
                    }
                },
                {
                    statusCode: 2,
                    statusName: 'InProgress',
                    statusDescription: 'En progreso',
                    statusIcon: {
                        iconName: 'assessment',
                        iconClass: 'tasksInProgress'
                    }
                },
                {
                    statusCode: 3,
                    statusName: 'Delayed',
                    statusDescription: 'Retrasadas',
                    statusIcon: {
                        iconName: 'assignment_late',
                        iconClass: 'tasksDelayed'
                    }
                },
                {
                    statusCode: 4,
                    statusName: 'Done',
                    statusDescription: 'Terminadas',
                    statusIcon: {
                        iconName: 'assignment_turned_in',
                        iconClass: 'tasksDone'
                    }
                }
            ];
            
            return Status;
        }
               
    }
})();