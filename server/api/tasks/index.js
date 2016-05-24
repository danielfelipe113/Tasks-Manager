'use strict';

var express = require('express');
var controller = require('./tasks.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index); //list of tasks
router.get('/:id', auth.isAuthenticated(), controller.show); //single task
router.get('/getTasks/:id/:justLength', auth.isAuthenticated(), controller.getTasks); //tasks by user id, optional can return just length of tasks
router.get('/byStatus/:userId/:status', auth.isAuthenticated(), controller.getByStatus); // tasks by user id and status
router.post('/', auth.isAuthenticated(), controller.create); //post task
router.put('/', auth.isAuthenticated(), controller.update); //put single or array of task
router.patch('/:id', auth.isAuthenticated(), controller.update); // patch task
router.delete('/:id', auth.hasRole('Administrator'), controller.destroy); //delete task

module.exports = router;
