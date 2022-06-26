const express = require('express');
const controller = require('./controller');
const router = express.Router();
const passport = require('passport');


router.post('/init',
    controller.init);

module.exports = router;
