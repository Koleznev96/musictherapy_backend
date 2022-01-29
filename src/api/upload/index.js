const express = require('express');
const controller = require('./controller');
const router = express.Router();
const passport = require('passport');
const upload = require('../../middleware/upload');


router.post('/image',
    upload.single('image'),
    controller.upload_image);

router.post('/video',
    upload.single('file'),
    controller.upload_video);

router.post('/delete',
    controller.delete_file);


module.exports = router;
