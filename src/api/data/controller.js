const errorHandler = require('../../utils/errorHandler');
const LiveSound = require('../../models/LiveSound');
const Video = require('../../models/Video');
const User = require('../../models/User');
const Audio = require('../../models/Audio');
const {limitPageData} = require("../../utils/dataConst");
const checkUser = require('../auth/authUser');
const LikeAudio = require("../../models/LikeAudio");
const LikeVideo = require("../../models/LikeVideo");
const Version = require("../../models/Version");
const Courses = require('../../models/Courses');
const Test = require('../../models/Test');
const LessonsCourses = require('../../models/LessonsCourses');
const QuestionsTest = require('../../models/QuestionsTest');
const UserCourse = require('../../models/UserCourse');
const UserTest = require('../../models/UserTest');
const UserQuestionTest = require('../../models/UserQuestionTest');
const UserLessonCourse = require('../../models/UserLessonCourse');

const {checkLanguage} = require("./detectionLanguage");
const {Tools} = require("../../middleware/tools");

module.exports.get_list_live_sound_ios = async function(req, res) {
    try {
        let access = "Без регистрации";
        const page = Number(req.params.page);
        let filter = {language: {$eq: 'ru'}};
        let data = await LiveSound.find(filter, null, { skip: page, limit: limitPageData });
        const count_page = (await LiveSound.find({}).count());
        for (let i = 0; i < data.length; i++) {
            // if (data[i].access.indexOf(access) === -1) {
            //     data.splice(i, 1);
            //     continue;
            // }
            data[i].label = data[i].label_?.find(item => item.language === 'ru')?.value;
        }
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData, access});
    } catch(e) {
        errorHandler(res, e);
        console.log('err-', e)
        // throw e;
    }
}

module.exports.get_list_meditation_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        const page = Number(req.params.page);
        let filter = {language: {$eq: 'ru'}};
        filter.category = "meditation";
        let data = await Video.find(filter, null, { skip: page, limit: limitPageData });
        const count_page = (await Video.find(filter).count());
        for (let i = 0; i < data.length; i++) {
            if (data[i].access.indexOf(access) === -1) {
                data.splice(i, 1);
                continue;
            }
            data[i].label = data[i].label_?.find(item => item.language === 'ru')?.value;
            data[i].poster = data[i].poster_?.find(item => item.language === 'ru')?.value;
            data[i].text = data[i].text_?.find(item => item.language === 'ru')?.value;
        }
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_classic_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        const page = Number(req.params.page);
        let filter = {language: {$eq: 'ru'}};
        filter.category = "classic";
        let data = await Video.find(filter, null, { skip: page, limit: limitPageData });
        const count_page = (await Video.find(filter).count());

        for (let i = 0; i < data.length; i++) {
            if (data[i].access.indexOf(access) === -1) {
                data.splice(i, 1);
                continue;
            }
            data[i].label = data[i].label_?.find(item => item.language === 'ru')?.value;
            data[i].poster = data[i].poster_?.find(item => item.language === 'ru')?.value;
            data[i].text = data[i].text_?.find(item => item.language === 'ru')?.value;
        }
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}


module.exports.get_list_live_sound = async function(req, res) {
    try {
        const page = Number(req.params.page);
        const data = await LiveSound.find({}, null, { skip: page, limit: limitPageData });
        const count_page = (await LiveSound.find({}).count());
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData});

        let candidate = await User.findOne({_id: req.user.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_meditation = async function(req, res) {
    try {
        const page = Number(req.params.page);
        const data = await Video.find({category: "meditation"}, null, { skip: page, limit: limitPageData });
        const count_page = (await Video.find({category: "meditation"}).count());
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData});

        let candidate = await User.findOne({_id: req.user.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_classic = async function(req, res) {
    try {
        const page = Number(req.params.page);
        const data = await Video.find({category: "classic"}, null, { skip: page, limit: limitPageData });
        const count_page = (await Video.find({category: "classic"}).count());
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData});

        let candidate = await User.findOne({_id: req.user.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_user = async function(req, res) {
    try {
        const page = Number(req.params.page);
        const filter = req.params.full_name !== "null" ? {fullName: req.params.full_name} : {};
        const data = await User.find(filter, null, { skip: page, limit: limitPageData });
        const count_page = (await User.find(filter).count());
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData});

        let candidate = await User.findOne({_id: req.user.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_test = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        let filter = checkLanguage(req, res);
        let data = await Test.find(filter);
        let question_data;
        for(let i = 0; i < data.length; i++) {
            if (!(!data[i].access || data[i].access.indexOf(access) !== -1)) {
                if (data[i].access.length === 1 && data[i].access.indexOf("VIP") !== -1) {
                    data.splice(i, 1);
                    continue;
                }
                if (data[i].access.indexOf("Премиум") !== -1 && data[i].access.indexOf("Без регистрации") === -1
                    && data[i].access.indexOf("Гость") === -1) {
                    data[i].dostup = 'premium';
                } else {
                    data[i].dostup = 'auth';
                }
            } else {
                data[i].dostup = 'view';
            }
            question_data = await UserTest.findOne({
                user_id: check._id,
                test_id: data[i]._id,
                status: false,
            }).limit(1).sort({$natural:-1});
            if (question_data) {
                data[i].status_start = question_data;
            }
            question_data = await UserTest.findOne({
                user_id: check._id,
                test_id: data[i]._id,
                status: true,
            }).limit(1).sort({$natural:-1});
            if (question_data) {
                data[i].status_end = question_data;
            }
        }
        res.status(201).json({data, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_course = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        let filter = checkLanguage(req, res);
        let data = await Courses.find(filter);

        let question_data;
        let avalibel;
        for(let i = 0; i < data.length; i++) {
            if (!(!data[i].access || data[i].access.indexOf(access) !== -1)) {
                if (data[i].access.length === 1 && data[i].access.indexOf("VIP") !== -1) {
                    data.splice(i, 1);
                    continue;
                }
                // if (data[i].access.indexOf("Премиум") !== -1 && data[i].access.indexOf("Без регистрации") === -1
                //     && data[i].access.indexOf("Гость") === -1) {
                //     data[i].dostup = 'premium';
                // } else {
                //     data[i].dostup = 'auth';
                // }
            } else {
                // data[i].dostup = 'view';
            }
            // console.log('check-', check)
            // Проверка на доступ по профилю
            if (check.available_courses) {
                // console.log('check.available_course-', check.available_courses)
                avalibel = check.available_courses.find((item) => {
                    return String(item.course_id) === String(data[i]._id)
                });
                // console.log('avalibel-', avalibel)
                data[i].avalibel = avalibel !== undefined && avalibel.end_date >= new Date();
                // console.log('data[i].avalibel-', data[i].avalibel)
                if (avalibel)
                    data[i].object_date = {
                        end_date: avalibel.end_date,
                        start_date: avalibel.start_date,
                    }
                // console.log('data[i].object_date-', data[i].object_date)
            }

            // if (check?._id && avalibel !== undefined && avalibel.end_date < new Date()) {
            //     check.available_courses
            //     await User.update(
            //         { _id: check?._id },
            //         { $pull: { 'available_courses': { course_id: data[i]._id } } }
            //     );
            // }

            question_data = await UserCourse.findOne({
                user_id: check._id,
                course_id: data[i]._id,
            });
            if (question_data) {
                data[i].status = question_data;
            }
        }

        res.status(201).json({data, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.start_test = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        // let lesson_data = await UserTest.findOne({
        //     user_id: check._id,
        //     test_id: req.body._id,
        // });
        // if (lesson_data) {
        //     return res.status(201).json({
        //         status: false,
        //         lesson_data
        //     });
        // }

        let data_user_test = new UserTest({
            user_id: check._id,
            test_id: req.body._id,
            status: false,
            current_question: 0,
            date_start: new Date(),
            user_name: check.fullName + ' ' + check.name,
        });
        await data_user_test.save();

        res.status(201).json({
            status: true,
            data_user_test
        });
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.start_course = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);

        let data_user_test = new UserCourse({
            user_id: check._id,
            course_id: req.body._id,
            status: false,
            current_lesson: 0,
            date_start: new Date(),
            user_name: check.fullName + ' ' + check.name,
        });
        await data_user_test.save();

        res.status(201).json({
            status: true,
            data_user_test
        });
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_question_test = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        const {id_test, id_user_test, number} = req.params;

        const question_data = await QuestionsTest.findOne({
            test_id: id_test,
            number: number,
        });

        const answer_question = await UserQuestionTest.findOne({
            user_id: check._id,
            test_id: id_test,
            question_test_id: question_data._id,
            user_test_id: id_user_test
        });

        res.status(201).json({
            question_data,
            answer_question
        });
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_lesson_course = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        const {course_id, number, user_course_id} = req.params;

        const lesson_data = await LessonsCourses.findOne({
            course_id: course_id,
            number: number,
        });

        const ok_lesson = await UserLessonCourse.findOne({
            user_id: check._id,
            course_id: course_id,
            course_lesson_id: lesson_data._id,
            user_course_id: user_course_id,
        });

        res.status(201).json({
            lesson_data,
            ok_lesson
        });
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.answer_question_test = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        const {id, number, answer, user_test_id} = req.body;

        const question_data = await QuestionsTest.findOne({
            test_id: id,
            number: number,
        });

        if (!question_data) {
            return res.status(405).json('ERROR, Not found question');
        }

        let answer_question = await UserQuestionTest.findOne({
            user_id: check._id,
            test_id: id,
            question_test_id: question_data._id,
            user_test_id: user_test_id._id
        });

        let answers_ok_is = question_data?.answers?.findIndex((item) => item.is_status === true) !== -1;
        // for(let i = 0; i < question_data?.answers?.length; i++) {
        //     if (question_data?.answers[i].is_status) answers_ok.push(question_data?.answers[i]);
        // }

        // console.log('answers_ok-', answers_ok)
        let status_answer = question_data?.answers?.find((item) => item.label === answer.label);
        let status = true;
        if (answers_ok_is) {
            status = status_answer.is_status;
        }

        // const status_answer = question_data?.answers?.find((item) => item.label === answer.label);

        if (answer_question) {
            answer_question.status = status;
            answer_question.answer = answer.label;
            answer_question.balls = status_answer.balls;
        } else {
            answer_question = new UserQuestionTest({
                user_id: check._id,
                test_id: id,
                question_test_id: question_data._id,
                user_test_id: user_test_id,
                status: status,
                answer: answer.label,
                balls: status_answer.balls,
            });
        }

        await answer_question.save();

        let user_test = await UserTest.findOne({
            _id: user_test_id
        });
        user_test.current_question = number;
        await user_test.save();

        res.status(201).json(answer_question);
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.answer_question_lesson = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        const {id, number, user_course_id} = req.body;

        const lesson_data = await LessonsCourses.findOne({
            course_id: id,
            number: number,
        });

        if (!lesson_data) {
            return res.status(405).json('ERROR, Not found lesson');
        }

        let ok_lesson = await UserLessonCourse.findOne({
            user_id: check._id,
            course_id: id,
            course_lesson_id: lesson_data._id,
            user_course_id: user_course_id,
        });

        if (!ok_lesson) {
            ok_lesson = new UserLessonCourse({
                user_id: check._id,
                course_id: id,
                course_lesson_id: lesson_data._id,
                user_course_id: user_course_id,
            });
        }

        await ok_lesson.save();

        let user_course = await UserCourse.findOne({
            _id: user_course_id
        });
        user_course.current_lesson = number;
        await user_course.save();

        res.status(201).json(ok_lesson);
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.test_return_result = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        const {id, user_test_id} = req.params;

        const test = await Test.findOne({_id: id});
        let result = await UserTest.find({
            user_id: check._id,
            test_id: id,
        });
        let questions_list = await QuestionsTest.find({
            test_id: id,
        });

        let data_list;
        for (let j = 0; j < result?.length; j++) {
            data_list = JSON.parse(JSON.stringify(questions_list));
            for (let i = 0; i < questions_list?.length; i++) {
                data_list[i].answer = await UserQuestionTest.findOne({
                    user_id: check._id,
                    test_id: id,
                    user_test_id: result[j]._id,
                    question_test_id: questions_list[i]._id
                });
            }
            result[j].data = data_list;
        }
        res.status(201).json({
            result,
            test
        });
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.complete_test = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        const {id, user_test_id, status_return} = req.body;

        const test = await Test.findOne({_id: id});
        let result = await UserTest.findOne({
            _id: user_test_id,
            user_id: check._id,
            test_id: id,
        });
        let questions_list = await QuestionsTest.find({
            test_id: id,
        });
        let balls = 0;
        let status = true;
        for(let i = 0; i < questions_list?.length; i++) {
            questions_list[i].answer = await UserQuestionTest.findOne({
                user_id: check._id,
                test_id: id,
                user_test_id: user_test_id,
                question_test_id: questions_list[i]._id
            });
            if (questions_list[i].answer) {
                balls += questions_list[i].answer?.balls;
            } else {
                status = false;
            }
        }

        if (!status && !status_return) {
            return res.status(201).json({
                status: false
            });
        }
        result.date_end = new Date();
        result.status = true;
        const resultation = test.result?.find((item => item.start_balls <= balls && balls <= item.end_balls));
        result.result = {
            description: resultation ? resultation.description : [
                {
                    language: 'ru',
                    value: 'Нет данных',
                },
                {
                    language: 'com',
                    value: 'Not founded',
                },
            ],
            balls: balls,
        }

        await result.save();

        res.status(201).json({
            data: {
                questions_list,
                result,
            },
            status: true,
        });
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.complete_course = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        const {id, user_course_id, status_return} = req.body;

        const course = await Courses.findOne({_id: id});
        let result = await UserCourse.findOne({
            _id: user_course_id,
        });

        const count_ok_lessons = await UserLessonCourse.find({
            user_course_id: user_course_id,
            user_id: check._id
        });

        const status = count_ok_lessons?.length >= course.length_lessons;

        if (!status && !status_return) {
            return res.status(201).json({
                status: false
            });
        }

        result.date_end = new Date();
        result.status = true;
        result.result_description = course?.result_text;

        await result.save();

        res.status(201).json({
            result,
            status: true
        });
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_v2_list_live_sound_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        const page = Number(req.params.page);
        let filter = checkLanguage(req, res);
        let data = await LiveSound.find(filter);
        // let data = await LiveSound.find(filter, null, { skip: page, limit: limitPageData });
        // const count_page = (await LiveSound.find({}).count());
        // for (let i = 0; i < data.length; i++) {
        //     data[i].dostup = !!(!data[i].access || data[i].access.indexOf(access) !== -1);
        // }
        res.status(201).json({data, page, count_page: 1, end_page: true, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_v2_list_meditation_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        const page = Number(req.params.page);
        let filter = checkLanguage(req, res);
        filter.category = "meditation";
        let data = await Video.find(filter);
        // let data = await Maps.find(filter, null, { skip: page, limit: limitPageData });
        // const count_page = (await Maps.find(filter).count());
        for (let i = 0; i < data.length; i++) {
            if (!(!data[i].access || data[i].access.indexOf(access) !== -1)) {
                if (data[i].access.length === 1 && data[i].access.indexOf("VIP") !== -1) {
                    data.splice(i, 1);
                    continue;
                }
                if (data[i].access.indexOf("Премиум") !== -1 && data[i].access.indexOf("Без регистрации") === -1
                    && data[i].access.indexOf("Гость") === -1) {
                    data[i].dostup = 'premium';
                } else {
                    data[i].dostup = 'auth';
                }
            } else {
                data[i].dostup = 'view';
            }
            // data[i].dostup = !!(!data[i].access || data[i].access.indexOf(access));
            if (check?._id) {
                let status = await LikeVideo.findOne({id_root: data[i]._id.toString(), id_user: check?._id.toString()});
                data[i].like = status ? 1 : 0;
            }
        }
        res.status(201).json({data, page, count_page: 1, end_page: true, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_v2_list_audio_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        // if (!check._id) {
        //     return res.status(401).json('Unauthorized');
        // }
        let access = (check._id && check.access) ? check.access : "Без регистрации";
        const category = req.params.category;
        const page = Number(req.params.page);
        // let data = await Audio.find({category}, null, { skip: page, limit: limitPageData });
        // const count_page = (await Audio.find({category}).count());
        let filter = checkLanguage(req, res);
        filter.category = category;
        let data = await Audio.find(filter);

        for (let i = 0; i < data.length; i++) {
            if (!(!data[i].access || data[i].access.indexOf(access) !== -1)) {
                data.splice(i, 1);
                continue;
                // if (data[i].access.length === 1 && data[i].access.indexOf("VIP") !== -1) {
                //     data.splice(i, 1);
                //     continue;
                // }
                // if (data[i].access.indexOf("Премиум") !== -1 && data[i].access.indexOf("Без регистрации") === -1
                //     && data[i].access.indexOf("Гость") === -1) {
                //     data[i].dostup = 'premium';
                // } else {
                //     data[i].dostup = 'auth';
                // }
            } else {
                data[i].dostup = 'view';
            }

            if (check._id) {
                let status = await LikeAudio.findOne({id_root: data[i]._id.toString(), id_user: check?._id.toString()});
                data[i].like = status ? 1 : 0;
            }

        }

        // for (let i = 0; i < data.length; i++) {
        //
        // }

        res.status(201).json({data, page, count_page: 20, end_page: true, access});

        // res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_v2_list_classic_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        const page = Number(req.params.page);
        let filter = checkLanguage(req, res);
        filter.category = "classic";
        let data = await Video.find(filter);
        // let data = await Maps.find(filter, null, { skip: page, limit: limitPageData });
        // const count_page = (await Maps.find(filter).count());

        for (let i = 0; i < data.length; i++) {
            if (!(!data[i].access || data[i].access.indexOf(access) !== -1)) {
                if (data[i].access.length === 1 && data[i].access.indexOf("VIP") !== -1) {
                    data.splice(i, 1);
                    continue;
                }
                if (data[i].access.indexOf("Премиум") !== -1 && data[i].access.indexOf("Без регистрации") === -1
                    && data[i].access.indexOf("Гость") === -1) {
                    data[i].dostup = 'premium';
                } else {
                    data[i].dostup = 'auth';
                }
            } else {
                data[i].dostup = 'view';
            }
            // data[i].dostup = !!(!data[i].access || data[i].access.indexOf(access));
            if (check?._id) {
                let status = await LikeVideo.findOne({id_root: data[i]._id.toString(), id_user: check?._id.toString()});
                data[i].like = status ? 1 : 0;
            }
        }

        res.status(201).json({data, page, count_page: 1, end_page: true, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_v2_list_fusion_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        const page = Number(req.params.page);
        let filter = checkLanguage(req, res);
        filter.category = "fusion";
        let data = await Video.find(filter);
        // let data = await Maps.find(filter, null, { skip: page, limit: limitPageData });
        // const count_page = (await Maps.find(filter).count());

        for (let i = 0; i < data.length; i++) {
            if (!(!data[i].access || data[i].access.indexOf(access) !== -1)) {
                if (data[i].access.length === 1 && data[i].access.indexOf("VIP") !== -1) {
                    data.splice(i, 1);
                    continue;
                }
                if (data[i].access.indexOf("Премиум") !== -1 && data[i].access.indexOf("Без регистрации") === -1
                    && data[i].access.indexOf("Гость") === -1) {
                    data[i].dostup = 'premium';
                } else {
                    data[i].dostup = 'auth';
                }
            } else {
                data[i].dostup = 'view';
            }
            // data[i].dostup = !!(!data[i].access || data[i].access.indexOf(access));
            if (check?._id) {
                let status = await LikeVideo.findOne({id_root: data[i]._id.toString(), id_user: check?._id.toString()});
                data[i].like = status ? 1 : 0;
            }
        }

        res.status(201).json({data, page, count_page: 1, end_page: true, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_tool_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        const page = Number(req.params.page);
        let filter = checkLanguage(req, res);
        filter.category = "tool";
        let data = await Video.find(filter);
        // let data = await Maps.find(filter, null, { skip: page, limit: limitPageData });
        // const count_page = (await Maps.find(filter).count());
        for (let i = 0; i < data.length; i++) {
            if (!(!data[i].access || data[i].access.indexOf(access) !== -1)) {
                if (data[i].access.length === 1 && data[i].access.indexOf("VIP") !== -1) {
                    data.splice(i, 1);
                    continue;
                }
                if (data[i].access.indexOf("Премиум") !== -1 && data[i].access.indexOf("Без регистрации") === -1
                    && data[i].access.indexOf("Гость") === -1) {
                    data[i].dostup = 'premium';
                } else {
                    data[i].dostup = 'auth';
                }
            } else {
                data[i].dostup = 'view';
            }
            // data[i].dostup = !!(!data[i].access || data[i].access.indexOf(access));
            if (check?._id) {
                let status = await LikeVideo.findOne({id_root: data[i]._id.toString(), id_user: check?._id.toString()});
                data[i].like = status ? 1 : 0;
            }
        }
        res.status(201).json({data, page, count_page: 1, end_page: true, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.video_like = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        if (!check?._id) {
            return res.status(401).json('Unauthorized');
        }
        const like = await LikeVideo.findOne({id_root: req.body.id.toString(), id_user: check?._id.toString()});
        if (req.params.status === "add" && !like) {
            const new_like = new LikeVideo({
                id_root: req.body.id.toString(),
                id_user: check?._id.toString(),
                user_name: check.fullName + ' ' + check.name,
                date: new Date(),
            });
            await new_like.save();
        }
        if (req.params.status === "put" && like) {
            await like.deleteOne();
        }
        res.status(201).json("OK");
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.audio_like = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        if (!check?._id) {
            return res.status(401).json('Unauthorized');
        }

        const like = await LikeAudio.findOne({id_root: req.body.id.toString(), id_user: check?._id.toString()});

        if (req.params.status === "add" && !like) {
            const new_like = new LikeAudio({
                id_root: req.body.id.toString(),
                id_user: check?._id.toString(),
                user_name: check.fullName + ' ' + check.name,
                date: new Date(),
            });
            await new_like.save();
        }
        if (req.params.status === "put" && like) {
            await like.deleteOne();
        }
        res.status(201).json("OK");
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_access = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        if (!check?._id) {
            return res.status(401).json('Unauthorized');
        }
        const access = check.access ? check.access : "Гость";
        res.status(201).json(access);
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_version = async function(req, res) {
    try {
        const version = await Version.findOne({root: 0});
        res.status(201).json({version});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_tools = async function(req, res) {
    try {
        res.status(201).json(Tools);
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.delete_user_course = async function(req, res) {
    try {
        await UserCourse.deleteMany();
        await UserLessonCourse.deleteMany();
        res.status(201).json('OK');
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}
