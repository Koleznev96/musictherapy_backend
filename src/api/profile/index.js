const express = require('express');
const controller = require('./controller');
const router = express.Router();
const passport = require('passport');


router.get('/data',
    // passport.authenticate('jwt', {session: false}),
    controller.get_data);

router.post('/re_data',
    // passport.authenticate('jwt', {session: false}),
    controller.re_data);

router.get('/translation/:language',
    // passport.authenticate('jwt', {session: false}),
    controller.translation);

router.get('/delete_account',
    // passport.authenticate('jwt', {session: false}),
    controller.delete_account);


module.exports = router;
