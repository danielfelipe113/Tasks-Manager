'use strict';

exports = module.exports = {
  // List of user roles
  userRoles: ['guest', 'Employee', 'Supervisor', 'Administrator'],
  userRolesJson: {
    "guest": "guest",
    "Employee": "Employee",
    "Administrator": "Administrator",
    "Supervisor": "Supervisor"
  },
  tasksStatus: {
    'InProgress' : 'InProgress',
    'ToDoToday' : 'ToDoToday',
    'ToDo' : 'ToDo',
    'Delayed' : 'Delayed',
    'Done' : 'Done' 
  }
};
