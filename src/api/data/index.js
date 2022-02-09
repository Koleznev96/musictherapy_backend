const express = require('express');
const controller = require('./controller');
const router = express.Router();
const passport = require('passport');


router.get('/live_sound/:page',
    passport.authenticate('jwt', {session: false}),
    controller.get_list_live_sound);

router.get('/meditation/:page',
    passport.authenticate('jwt', {session: false}),
    controller.get_list_meditation);

router.get('/classic/:page',
    passport.authenticate('jwt', {session: false}),
    controller.get_list_classic);

router.get('/live_sound/ios/:page',
    controller.get_list_live_sound_ios);

router.get('/meditation/ios/:page',
    controller.get_list_meditation_ios);

router.get('/classic/ios/:page',
    controller.get_list_classic_ios);

router.get('/users/:page/:full_name',
    passport.authenticate('jwt', {session: false}),
    controller.get_list_user);

module.exports = router;
