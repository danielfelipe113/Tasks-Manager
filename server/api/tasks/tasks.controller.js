/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tasks              ->  index
 * POST    /api/tasks              ->  create
 * GET     /api/tasks/:id          ->  show
 * PUT     /api/tasks/:id          ->  update
 * DELETE  /api/tasks/:id          ->  destroy
 */

'use strict';

import appConfig from '../../config/environment';
import _ from 'lodash';
import Tasks from './tasks.model';
import q from 'q';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {

        return updated;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a all Tasks
export function index(req, res) {
  return Tasks.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Tasks from the DB
export function show(req, res) {
  return Tasks.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Tasks from the DB by its statusName
export function getByStatus(req, res) {
  return Tasks.find({
    'AssignTo._id': req.params.userId,
    'Status.statusName': req.params.status
  }).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Tasks in the DB
export function create(req, res) {
  return Tasks.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Tasks in the DB
export function update(req, res) {
  if (!req.body.length) {
    var idSingle = req.body._id;

    return Tasks.findById(idSingle).exec()
      .then(handleEntityNotFound(res))
      .then(saveUpdates(req.body))
      .then(respondWithResult(res))
      .catch(handleError(res));
  } else {
    var tasks = req.body;
    for (var i in tasks) {
      var id = tasks[i]._id;
      var task = tasks[i];


      Tasks.findById(id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(task))
        .then(respondWithResult(res))
        .catch(handleError(res));
    }
  }
}

export function getTasks(req, res) {
  var id = req.params.id;
  var justLength = req.params.justLength || false;
  getTasksServer(id, justLength)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//private methods

// Get tasks by user Id and map it in diferent status, width second argument 'true' the function just return the length of the tasks
function getTasksServer(id, justLength) {
  var deferred = q.defer();
  var tempTasks = {};
  var tasksLength = {
    haveTasks: false,
    totalTasks: 0
  };

  for (var status in appConfig.tasksStatus) {
    tempTasks[status] = [];
    tasksLength[status] = 0;
  }


  Tasks.find({
    'AssignTo._id': id
  }).exec()
    .then(function (res) {
      res.forEach(function (element) {
        if (element.Status.statusName === appConfig.tasksStatus.InProgress) {
          tempTasks.InProgress.push(element);
        } else if (element.Status.statusName === appConfig.tasksStatus.ToDoToday) {
          tempTasks.ToDoToday.push(element);
        } else if (element.Status.statusName === appConfig.tasksStatus.ToDo) {
          tempTasks.ToDo.push(element);
        } else if (element.Status.statusName === appConfig.tasksStatus.Delayed) {
          tempTasks.Delayed.push(element);
        } else if (element.Status.statusName === appConfig.tasksStatus.Done) {
          tempTasks.Done.push(element);
        }


        for (var i = 0; i < element.AssignTo.length; i++) {
          if (id === element.AssignTo[i]._id) {
            tasksLength.data = element.AssignTo[i];
          }
        }

      });

      for (var tasksPosition in tempTasks) {
        if (tempTasks[tasksPosition].length) {
          tasksLength[tasksPosition] = tempTasks[tasksPosition].length;
          tasksLength.haveTasks = true;
          tasksLength.totalTasks += tempTasks[tasksPosition].length;
        }
      }

      if (justLength) {
        deferred.resolve(tasksLength);
      } else {
        tempTasks.tasksLength = tasksLength
        deferred.resolve(tempTasks);
      }
    })
  return deferred.promise;
}

// Deletes a Tasks from the DB
export function destroy(req, res) {
  return Tasks.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
