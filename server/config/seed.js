/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';

User.find({}).remove()
  .then(() => {
    User.create(
      {
        provider: 'local',
        firstName: 'Administrator1',
        lastName: 'lastNameAdmin1',
        fullName: 'Administrator1 lastNameAdmin1',
        email: 'administrator1@example.com',
        password: 'Administrator1',
        role: 'Administrator',
        userSupervisors: []
      },
      {
        provider: 'local',
        firstName: 'Administrator2',
        lastName: 'lastNameAdmin2',
        fullName: 'Administrator2 lastNameAdmin2',
        email: 'administrator2@example.com',
        password: 'Administrator2',
        role: 'Administrator',
        userSupervisors: []
      },
      {
        provider: 'local',
        firstName: 'Administrator3',
        lastName: 'lastNameAdmin3',
        fullName: 'Administrator3 lastNameAdmin3',
        email: 'administrator3@example.com',
        password: 'Administrator3',
        role: 'Administrator',
        userSupervisors: []
      },
      {
        provider: 'local',
        firstName: 'Supervisor1',
        lastName: 'LastNameSupervisor',
        fullName: 'Supervisor1 LastNameSupervisor',
        email: 'Supervisor1@example.com',
        password: 'Supervisor1',
        role: 'Supervisor',
        userSupervisors: []
      },
      {
        provider: 'local',
        firstName: 'Supervisor2',
        lastName: 'LastNameSupervisor',
        fullName: 'Supervisor2 LastNameSupervisor',
        email: 'Supervisor2@example.com',
        password: 'Supervisor2',
        role: 'Supervisor',
        userSupervisors: []
      },
      {
        provider: 'local',
        firstName: 'Supervisor3',
        lastName: 'LastNameSupervisor',
        fullName: 'Supervisor3 LastNameSupervisor',
        email: 'Supervisor2@example.com',
        password: 'Supervisor3',
        role: 'Supervisor',
        userSupervisors: []
      },
      {
        provider: 'local',
        firstName: 'Employee1',
        lastName: 'LastNameEmployee',
        fullName: 'Employee1 LastNameEmployee',
        email: 'Employee1@example.com',
        password: 'Employee1',
        role: 'Employee',
        userSupervisors: []
      },
      {
        provider: 'local',
        firstName: 'Employee2',
        lastName: 'LastNameEmployee',
        fullName: 'Employee2 LastNameEmployee',
        email: 'Employee1@example.com',
        password: 'Employee',
        role: 'Employee2',
        userSupervisors: []
      },
      {
        provider: 'local',
        firstName: 'Employee3',
        lastName: 'LastNameEmployee',
        fullName: 'Employee3 LastNameEmployee',
        email: 'Employee3@example.com',
        password: 'Employee3',
        role: 'Employee',
        userSupervisors: []
      })
      .then(() => {
        console.log('finished populating users');
      });
  });