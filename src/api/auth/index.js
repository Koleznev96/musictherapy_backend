const express = require('express');
const controller = require('./controller');
const router = express.Router();


router.post('/login', controller.login);

router.post('/register_new', controller.register);

router.post('/register', controller.register_old);

router.post('/help_password', controller.help_password);

router.post('/code_check', controller.code_check);

router.get('/get_data', controller.get_data);

module.exports = router;
