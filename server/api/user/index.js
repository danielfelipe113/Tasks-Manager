'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.delete('/:id', controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.patch('/:id', auth.isAuthenticated(), controller.updateUser);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/getUsersByRole/:role', auth.isAuthenticated(), controller.getUsersByRole);
router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;
