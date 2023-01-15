const express = require("express");
const controller = require("./controller");
const translationsController = require("../translations/translationsController");
const router = express.Router();

router.get("/translation/:language", controller.translation);

router.post("/register", controller.register);

router.post("/login", controller.login);

router.post("/help_password", controller.help_password);

router.post("/re_password", controller.update_password);

router.post("/re_email", controller.update_email);

router.post("/create_user", controller.create_user);

router.post("/create_live_sound", controller.create_live_sound);

router.post("/create_video", controller.create_video);

router.post("/create_audio", controller.create_audio);

router.post("/create_map", controller.create_map);

router.post("/create_test", controller.create_test);

router.post("/create_course", controller.create_course);

router.get("/live_sound/:page/:label", controller.get_list_live_sound);

router.get("/video/:page/:label", controller.get_list_video);

router.get("/audio/:page/:label/:category/:genre", controller.get_list_audio);

router.get("/maps/:page/:label", controller.get_list_maps);

router.get("/test/:page/:label", controller.get_list_test);

router.get("/courses/:page/:label", controller.get_list_courses);

router.get("/courses_mini_list", controller.get_mini_list_courses);

router.get("/lessons_course/:id", controller.get_lessons_course);

router.get("/questions_test/:id", controller.get_questions_test);

router.get("/meditation/:page/:label", controller.get_list_meditation);

router.get("/get_musictherapys", controller.get_musictherapys);

router.get("/get_notes/:id_user", controller.get_notes);

router.get("/get_statistics_test/:id_user", controller.get_statistics_test);

router.get("/classic/:page/:label", controller.get_list_classic);

router.get(
    "/users/:page/:full_name/:is_admin/:access/:language",
    controller.get_list_user
);

router.get(
    "/users_fin/:page/:full_name/:is_admin/:access/:language",
    controller.get_list_user_fin
);

// router.get('/users_fin/:page/:full_name/:is_admin/:access/:language',
//     controller.get_list_user);

router.post("/re_live_sound", controller.re_live_sound);

router.post("/re_video", controller.re_video);

router.post("/re_audio", controller.re_audio);

router.post("/re_map", controller.re_map);

router.post("/re_test", controller.re_test);

router.post("/re_course", controller.re_course);

router.post("/re_user", controller.re_user);

router.post("/delete_live_sound", controller.delete_live_sound);

router.post("/delete_video", controller.delete_video);

router.post("/delete_audio", controller.delete_audio);

router.post("/delete_map", controller.delete_map);

router.post("/delete_test", controller.delete_test);

router.post("/delete_course", controller.delete_course);

router.post("/delete_user", controller.delete_user);

router.get("/translation", controller.get_translation);

router.post("/re_translation", controller.re_translation);

router.get("/translation_admin", controller.get_translation_admin);

router.post("/re_translation_admin", controller.re_translation_admin);

router.post("/re_version", controller.re_version);

router.post("/reordering", controller.reordering);

router.get("/lengs", translationsController.get_lengs);

router.get(
    "/translations/:status/:code",
    translationsController.get_translations
);

router.post("/translation_create", translationsController.translation_create);

router.post("/translation_del", translationsController.translation_del);

router.post(
    "/translation_list_edit",
    translationsController.translation_list_edit
);

// router.post('/users/sort',
//     controller.users_sort);

// router.post('/video/sort',
//     controller.video_sort);
//
// router.post('/audio/sort',
//     controller.audio_sort);

router.get("/playlist/:label", controller.get_playlist);

router.get("/get_audio_to_playlist", controller.get_audio_to_playlist);

router.get("/get_video_to_playlist", controller.get_video_to_playlist);

router.post("/playlist_re", controller.playlist_re);

router.post("/delete_playlist", controller.delete_playlist);

router.get("/get_users_to_access", controller.get_users_to_access);

router.post("/get_users_name_to_id", controller.get_users_name_to_id);

router.post("/get_audio_label_to_id", controller.get_audio_label_to_id);

router.post("/get_video_label_to_id", controller.get_video_label_to_id);

module.exports = router;
