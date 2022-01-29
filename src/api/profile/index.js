const express = require('express');
const controller = require('./controller');
const router = express.Router();
const passport = require('passport');


router.get('/data',
    passport.authenticate('jwt', {session: false}),
    controller.get_data);


module.exports = router;
