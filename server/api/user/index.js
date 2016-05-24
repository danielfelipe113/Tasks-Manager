'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/getUsersByRole/:role', auth.isAuthenticated(), controller.getUsersByRole);
router.delete('/:id', auth.hasRole('Administrator'), controller.destroy);
router.patch('/:id', auth.hasRole('Administrator'), controller.updateUser);
router.post('/',  controller.create);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

module.exports = router;
