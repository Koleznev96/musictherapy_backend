const express = require('express');
const controller = require('./controller');
const router = express.Router();


router.post('/login', controller.login);

router.post('/register', controller.register);

router.post('/help_password', controller.help_password);

router.post('/code_check', controller.code_check);

module.exports = router;
