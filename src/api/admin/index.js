const express = require('express');
const controller = require('./controller');
const router = express.Router();


router.post('/register',
    controller.register);

router.post('/login',
    controller.login);

router.post('/help_password',
    controller.help_password);

router.post('/re_password',
    controller.update_password);

router.post('/re_email',
    controller.update_email);

router.post('/create_live_sound',
    controller.create_live_sound);

router.post('/create_video',
    controller.create_video);

router.get('/live_sound/:page/:label',
    controller.get_list_live_sound);

router.get('/video/:page/:label',
    controller.get_list_video);

router.get('/meditation/:page/:label',
    controller.get_list_meditation);

router.get('/classic/:page/:label',
    controller.get_list_classic);

router.get('/users/:page/:full_name',
    controller.get_list_user);

router.post('/re_live_sound',
    controller.re_live_sound);

router.post('/re_video',
    controller.re_video);

router.post('/re_user',
    controller.re_user);

module.exports = router;
