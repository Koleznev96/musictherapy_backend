const express = require("express");
const controller = require("./controller");
const translationsController = require("../translations/translationsController");
const router = express.Router();
const passport = require("passport");

router.get(
    "/live_sound/:page",
    passport.authenticate("jwt", { session: false }),
    controller.get_list_live_sound
);

router.get(
    "/meditation/:page",
    passport.authenticate("jwt", { session: false }),
    controller.get_list_meditation
);

router.get(
    "/classic/:page",
    passport.authenticate("jwt", { session: false }),
    controller.get_list_classic
);

router.get("/get_list_test", controller.get_list_test);

router.get("/get_list_course", controller.get_list_course);

// начать тест
router.post("/start_test", controller.start_test);

// начать курс
router.post("/start_course", controller.start_course);

// получение вопроса
router.get(
    "/get_question_test/:id_test/:id_user_test/:number",
    controller.get_question_test
);

// получение урока
router.get(
    "/get_lesson_course/:course_id/:user_course_id/:number",
    controller.get_lesson_course
);

// ответи на тест
router.post("/answer_question_test", controller.answer_question_test);

// ответи на урок
router.post("/answer_question_lesson", controller.answer_question_lesson);

// завершение теста
router.post("/complete_test", controller.complete_test);

// завершить курс
router.post("/complete_course", controller.complete_course);

// получение результата по тесту
router.get(
    "/test_return_result/:id/:user_test_id",
    controller.test_return_result
);

router.get("/live_sound/ios/:page", controller.get_list_live_sound_ios);

router.get("/meditation/ios/:page", controller.get_list_meditation_ios);

router.get("/classic/ios/:page", controller.get_list_classic_ios);

router.get("/v2/live_sound/ios/:page", controller.get_v2_list_live_sound_ios);

router.get("/v2/meditation/ios/:page", controller.get_v2_list_meditation_ios);

router.get("/v2/classic/ios/:page", controller.get_v2_list_classic_ios);

router.get("/v2/fusion/ios/:page", controller.get_v2_list_fusion_ios);

router.get("/v2/tool/ios/:page", controller.get_list_tool_ios);

router.get("/audio/:category/:page", controller.get_v2_list_audio_ios);

router.post("/video/like/:status", controller.video_like);

router.post("/audio/like/:status", controller.audio_like);

router.get("/access", controller.get_access);

router.get("/version", controller.get_version);

router.get("/tools", controller.get_tools);

router.get(
    "/users/:page/:full_name",
    passport.authenticate("jwt", { session: false }),
    controller.get_list_user
);

// router.get('/admin/delete/user_course/228337',
//     controller.delete_user_course);

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

router.get("/playlist", controller.get_playlist);

router.post("/count_playlist", controller.count_playlist);

router.post("/get_audio_ids", controller.get_audio_ids);

router.post("/get_video_ids", controller.get_video_ids);

module.exports = router;
