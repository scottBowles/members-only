const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

router.get('/', indexController.index);

router.get('/sign-up', indexController.signup_get);
router.post('/sign-up', indexController.signup_post);

router.get('log-in', indexController.login_get);
router.post('/log-in', indexController.login_post);

router.get('/log-out', indexController.logout_get);

module.exports = router;
