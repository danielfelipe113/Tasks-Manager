/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tasks              ->  index
 * POST    /api/tasks              ->  create
 * GET     /api/tasks/:id          ->  show
 * PUT     /api/tasks/:id          ->  update
 * DELETE  /api/tasks/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Tasks from './tasks.model';

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

// Gets a list of Taskss
export function index(req, res) {
  return Tasks.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Tasks from the DB
export function showByUserId(req, res) {
  return Tasks.find(
    {
      'AssignTo._id': req.params.userId
    }
  )
    .exec()
    .then(handleEntityNotFound(res))
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





  // return Tasks.findById(req.params.id).exec()
  //   .then(handleEntityNotFound(res))
  //   .then(saveUpdates(req.body))
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
}

// Deletes a Tasks from the DB
export function destroy(req, res) {
  return Tasks.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
