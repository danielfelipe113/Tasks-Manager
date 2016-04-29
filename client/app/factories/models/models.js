(function () {
    'use strict';

    angular
        .module('tasksAdminApp')
        .factory('models', models);

    function models() {
        var service = {
            createEmptyTask: createEmptyTask,
            createTaskModel: createTaskModel
        };            

        return service;
        
        function CreateEmptyUser() {
            this.Id = 0;
            this.FirstName = null;
            this.LastName = null;
            this.IsActive = null;
            this.password = null;
            this.email = null;
            this.Roles = [];
            this.UserSupervisors = [];
        }

        function createEmptyTask() {
            this.Id = 0;
            this.Title = 'null';
            this.Description = 'null';
            this.Comments = 'null';
            this.Priority = 'null';
            this.AssignBy = 'null';
            this.AssignTo = 'null';
            this.DoBeforeDate = 123;
            this.AssignDate = 321;
            this.EstimatedHours = 2;
            this.TimeSpent = 1;
        }

        function createTaskModel() {
            this.Priority = [
                {
                    textual: 'Low',
                    number: 1,
                    icon: {
                        name: 'bookmark_border',
                        class: 'priorityLow'
                    }
                },
                {
                    textual: 'Medium',
                    number: 2,
                    icon: {
                        name: 'bookmark',
                        class: 'priorityMedium'
                    }
                },
                {
                    textual: 'High',
                    number: 3,
                    icon: {
                        name: 'warning',
                        class: 'priorityHigh'
                    }
                }
            ];
            this.AssignBy = [
                {
                    name: 'Daniel',
                    lastName: 'Gonzales',
                    charge: 'SuperAdmin'
                },
            ];
            this.AssignTo = [
                {
                    name: 'Daniel',
                    lastName: 'Coy',
                    charge: 'Admin'
                },
                {
                    name: 'Felipe',
                    lastName: 'Triana',
                    charge: 'Admins'
                },
                {
                    name: 'Andira',
                    lastName: 'Coy',
                    charge: 'Employee'
                }
            ];
            this.DoBeforeDate = new Date();
            this.AssignDate = new Date();
        }
    }
})();


// userSupervisors: Usuarios con rol supervisor o employee deben tener supervisor (admin y supervisor/admin respectivamente)

// assignBy: Usuario con un rol de supervisor o administrador
// AssignTo: Todos los usuarios que un supervisor Supervise o todos los usuarios para administrador

// prioridad: {
//                     textual: 'Low',
//                     number: 1,
//                     icon: {
//                         name: 'bookmark_border',
//                         class: 'priorityLow'
//                     }
//                 },

