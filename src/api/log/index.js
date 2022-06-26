const express = require('express');
const controller = require('./controller');
const router = express.Router();
const passport = require('passport');


router.post('/auth',
    controller.log_auth);

router.post('/play_data',
    controller.log_play_data);

module.exports = router;
