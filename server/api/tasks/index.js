'use strict';

var express = require('express');
var controller = require('./tasks.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/byUserId/:userId', auth.isAuthenticated(), controller.showByUserId);
router.get('/byStatus/:userId/:status', auth.isAuthenticated(), controller.getByStatus);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.hasRole('Administrator'), controller.destroy);

module.exports = router;
