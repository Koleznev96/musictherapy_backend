const errorHandler = require('../../utils/errorHandler');
const LiveSound = require('../../models/LiveSound');
const Video = require('../../models/Video');
const Audio = require('../../models/Audio');
const Admin = require('../../models/Admin');
const User = require('../../models/User');
const Test = require('../../models/Test');
const Notes = require('../../models/Notes');
const LessonsCourses = require('../../models/LessonsCourses');
const QuestionsTest = require('../../models/QuestionsTest');
const Questionnaire = require('../../models/Questionnaire');
const UserTest = require('../../models/UserTest');
const UserCourse = require('../../models/UserCourse');
const LikeVideo = require('../../models/LikeVideo');
const LikeAudio = require('../../models/LikeAudio');
const Maps = require('../../models/Maps');
const Courses = require('../../models/Courses');
const Translation = require('../../models/Translation');
const Version = require('../../models/Version');
const MaxNumbers = require('../../models/MaxNumbers');
const LogData = require("../../models/LogData");
const checkAdmin = require('./authAdmin');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const {limitPageDataVeb} = require("../../utils/dataConst");
var fs = require('fs');
const UserLessonCourse = require("../../models/UserLessonCourse");
const checkUser = require("../auth/authUser");
const UserQuestionTest = require("../../models/UserQuestionTest");


module.exports.translation = async function(req, res) {
    try {
        const language = req.params.language;
        const check = await checkAdmin.check(req, res);
        if (check.id) {
            let candidate = await User.findOne({_id: check.id});
            if (candidate._id) {
                candidate.language = language;
                await candidate.save();
            }
        }
        const translation = await Translation.findOne({root: 1});
        let obj;
        await fs.readFile(`./${translation[language]}`, 'utf8', async function (err, data) {
            if (err) {
                console.log('errr, not File:', `./${translation[language]}`);
                res.status(201).json({});
                return;
            }
            res.status(201).json(JSON.parse(data));
        });

    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.register = async function(req, res) {
    try {
        const date = new Date();

        let admin = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            fullName: req.body.fullName,
            telephone: req.body.telephone,
            date_last_activity: date,
            registration_date: date,
        });

        const token = jwt.sign({
            email: admin.email,
            userId: admin._id,
        }, keys.jwt, {expiresIn: 60000 * 60000});

        admin.token = `Bearer ${token}`;
        await admin.save();

        res.status(201).json({
            token: `Bearer ${token}`
        });
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.login = async function(req, res) {
    let candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        const passwordResult = req.body.password === candidate.password;
        if (passwordResult && (candidate.type_admin === 'Администратор' || candidate.type_admin === 'Музыкотерапевт')) {
            // const token = jwt.sign({
            //     email: candidate.email,
            //     userId: candidate._id,
            // }, keys.jwt, {expiresIn: 60000 * 60000});
            const token = 'sdfgsdgf456fdgs' + candidate._id;

            candidate.date_last_activity = new Date();
            candidate.token = `Bearer ${token}`;
            await candidate.save();

            res.status(200).json({
                type_admin: candidate.type_admin,
                token: `Bearer ${token}`,
                name: candidate.fullName + ' ' + candidate.name,
            });
        } else {
            res.status(409).json({
                errors: [['email', 'Неверный пароль или e-mail.'], ['password', 'Неверный пароль или e-mail.']]
            });
        }
    } else {
        res.status(409).json({
            errors: [['email', 'Неверный пароль или e-mail.'], ['password', 'Неверный пароль или e-mail.']]
        });
    }
}

module.exports.help_password = async function(req, res) {
    // Воставновление пароля
    // Отправляем Письмо с паролем
    try {
        res.status(201).json('OK');
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.update_password = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        if (candidate.password !== req.body.password) {
            return res.status(409).json({
                errors: [['password', 'Не верный пароль.']]
            });
        }

        candidate.date_last_activity = new Date();
        candidate.password = req.body.new_password;
        await candidate.save();

        res.status(201).json({new_password: req.body.new_password});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.update_email = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        if (candidate.password !== req.body.password) {
            return res.status(409).json({
                errors: [['password', 'Не верный пароль.']]
            });
        }

        candidate.date_last_activity = new Date();
        candidate.email = req.body.new_email;
        await candidate.save();

        res.status(201).json({new_password: req.body.new_password});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.create_user = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let new_data_user = {};
        for (let key of Object.keys(req.body.data)) {
            if (req.body.data[key] && req.body.data[key].length) {
                new_data_user[key] = req.body.data[key];
            }
        }

        let new_data = new User({
            isNoCheck: false,
            is_admin: false,
            type_admin: 'Клиент',
            access: "Гость",
            password: req.body.password,
            ...new_data_user,
            status: false,
        });

        await new_data.save();

        if (req.body.data.notes !== undefined) {
            let new_notes = null;
            for(let i = 0; i < req.body.data.notes.length; i++) {
                new_notes = new Notes({
                    ...req.body.data.notes[i],
                    id_user: new_data._id,
                    note_writer_name: candidate.fullName + ' ' + candidate.name,
                });
                await new_notes.save();
            }
        }


        if (req.body.data?.questionnaire) {
            const questionnaire = new Questionnaire({
                id_user: new_data._id.toString(),
                ...req.body.data.questionnaire,
                status: false,
            });
            await questionnaire.save();
        }

        res.status(201).json(new_data);

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.create_live_sound = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let dataTable = await MaxNumbers.findOne({table_name: "video"});
        dataTable.number = dataTable.number + 1;

        const new_data = new LiveSound({
            ...req.body.data,
            date: new Date(),
            number: dataTable.number,
        });

        await new_data.save();
        await dataTable.save();

        res.status(201).json(new_data);

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.create_audio = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let dataTable = await MaxNumbers.findOne({table_name: "video"});
        dataTable.number = dataTable.number + 1;

        const new_data = new Audio({
            ...req.body.data,
            date: new Date(),
            number: dataTable.number,
        });

        await new_data.save();
        await dataTable.save();

        res.status(201).json(new_data);

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.create_video = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let dataTable = await MaxNumbers.findOne({table_name: "video"});
        dataTable.number = dataTable.number + 1;

        const new_data = new Video({
            ...req.body.data,
            date: new Date(),
            number: dataTable.number,
        });

        await new_data.save();
        await dataTable.save();

        res.status(201).json(new_data);

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.create_map = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let dataTable = await MaxNumbers.findOne({table_name: "maps"});
        dataTable.number = dataTable.number + 1;

        const new_data = new Maps({
            ...req.body.data,
            number: dataTable.number,
        });

        await new_data.save();
        await dataTable.save();

        res.status(201).json(new_data);

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.create_test = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let dataTable = await MaxNumbers.findOne({table_name: "test"});
        if (dataTable && dataTable.number)
        dataTable.number = dataTable.number + 1;

        const new_data = new Test({
            ...req.body.data,
            number: dataTable?.number,
            length_questions: req.body.data.questions?.length,
        });

        // if (req.body.data.questions) {
        //     let new_lesson;
        //     for(let i = 0; i < req.body.data.questions.length; i++) {
        //         new_lesson = new QuestionsTest({
        //             test_id: new_data._id,
        //             ...req.body.data.questions[i]
        //         });
        //         await new_lesson.save();
        //     }
        // }
        if (req.body.data.questions) {
            let new_question = null;
            for(let i = 0; i < req.body.data.questions.length; i++) {
                new_question = new QuestionsTest({
                    ...req.body.data.questions[i],
                    test_id: new_data._id,
                    number: i,
                    length_questions: req.body.data.questions.length,
                });
                await new_question.save();
            }
        }

        await new_data.save();
        if (dataTable) await dataTable.save();

        res.status(201).json(new_data);

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.create_course = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let dataTable = await MaxNumbers.findOne({table_name: "courses"});
        if (dataTable && dataTable.number)
        dataTable.number = dataTable.number + 1;

        const new_data = new Courses({
            ...req.body.data,
            number: dataTable?.number,
            length_lessons: req.body.data.lessons?.length,
        });

        await LessonsCourses.deleteMany({course_id: new_data._id});

        if (req.body.data.lessons) {
            let new_lesson = null;
            for(let i = 0; i < req.body.data.lessons.length; i++) {
                new_lesson = new LessonsCourses({
                    ...req.body.data.lessons[i],
                    course_id: new_data._id,
                    number: i,
                    length_lessons: req.body.data.lessons.length,
                });
                await new_lesson.save();
            }
        }

        await new_data.save();
        if (dataTable)
        await dataTable.save();

        res.status(201).json(new_data);

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}

module.exports.get_list_live_sound = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        const page = (Number(req.params.page)) * limitPageDataVeb;
        // const filter = req.params.label ? (req.params.label !== "null" ? {label: req.params.label} : {}): {};
        const filter = req.params.label ? (req.params.label !== "null" ? {label: {$elemMatch: {value: {$regex: req.params.label}}}} : {}): {};
        // const data = await LiveSound.find(filter, null, { skip: page, limit: limitPageDataVeb });
        const data = await LiveSound.find(filter);
        const count_page = Math.ceil((await LiveSound.find(filter).count()) / limitPageDataVeb) - 1;
        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page});

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_audio = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        const page = (Number(req.params.page)) * limitPageDataVeb;
        // const filter = req.params.label ? (req.params.label !== "null" ? {label: {$regex: req.params.label}} : {}): {};
        let filter = {};
        // const filter = req.params.label ? (req.params.label !== "null" ? {label: {$elemMatch: {value: {$regex: req.params.label}}}} : {}): {};
        if (req.params.label && req.params.label !== "null") filter.label = {$elemMatch: {value: {$regex: req.params.label}}};
        if (req.params.category && req.params.category !== "null") filter.category = req.params.category;
        if (req.params.genre && req.params.genre !== "null") filter.genre = req.params.genre;
        // const data = await Audio.find(filter, null, { skip: page, limit: limitPageDataVeb });
        const data = await Audio.find(filter);
        const count_page = Math.ceil((await Audio.find(filter).count()) / limitPageDataVeb) - 1;
        const count_data = await Audio.find().count();

        for (let i = 0; i < data?.length; i++) {
            // data[i].like = await LikeAudio.find({id_root: data[i]._id.toString()}).count();
            // data[i].counter_start = await LogData.find({id_data: data[i]._id.toString()}, { date: 1, user_name: 1 });
            data[i].counter_start = await LogData.find({id_data: data[i]._id.toString()}).count();
            data[i].like_tooltip = await LikeAudio.find({id_root: data[i]._id.toString()},
                { date: 1, user_name: 1 });
            data[i].like = data[i].like_tooltip?.length;
        }

        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page, count_data});

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_video = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        const page = (Number(req.params.page)) * limitPageDataVeb;
        const filter = req.params.label ? (req.params.label !== "null" ? {label_: {$elemMatch: {value: {$regex: req.params.label}}}} : {}): {};
        // let data = await Video.find(filter, null, { skip: page, limit: limitPageDataVeb });
        let data = await Video.find(filter);
        const count_page = Math.ceil((await Video.find(filter).count()) / limitPageDataVeb) - 1;
        const count_data = await Video.find().count();

        for (let i = 0; i < data?.length; i++) {
            // data[i].like = await LikeVideo.find({id_root: data[i]._id.toString()}).count();
            // data[i].counter_start = await LogData.find({id_data: data[i]._id.toString()}, { date: 1, user_name: 1 });
            data[i].counter_start = await LogData.find({id_data: data[i]._id.toString()}).count();
            data[i].like_tooltip = await LikeVideo.find({id_root: data[i]._id.toString()},
                { date: 1, user_name: 1 });
            data[i].like = data[i].like_tooltip?.length;
        }

        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page, count_data});

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_maps = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        const page = (Number(req.params.page)) * limitPageDataVeb;
        const filter = req.params.label ? (req.params.label !== "null" ? {label_: {$elemMatch: {value: {$regex: req.params.label}}}} : {}): {};
        // let data = await Maps.find(filter, null, { skip: page, limit: limitPageDataVeb });
        let data = await Maps.find(filter);
        const count_page = Math.ceil((await Maps.find(filter).count()) / limitPageDataVeb) - 1;

        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page});

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_test = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        const page = (Number(req.params.page)) * limitPageDataVeb;
        const filter = req.params.label ? (req.params.label !== "null" ? {label_: {$elemMatch: {value: {$regex: req.params.label}}}} : {}): {};
        // let data = await Test.find(filter, null, { skip: page, limit: limitPageDataVeb });
        let data = await Test.find(filter);
        const count_page = Math.ceil((await Test.find(filter).count()) / limitPageDataVeb) - 1;

        for (let i = 0; i < data.length; i++) {
            data[i].info_tooltip = await UserTest.find({
                test_id: data[i]._id,
                status: true,
            }, { date_start: 1, user_name: 1, result: 1 });
        }

        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page});

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_courses = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        const page = (Number(req.params.page)) * limitPageDataVeb;
        const filter = req.params.label ? (req.params.label !== "null" ? {label_: {$elemMatch: {value: {$regex: req.params.label}}}} : {}): {};
        // let data = await Courses.find(filter, null, { skip: page, limit: limitPageDataVeb });
        let data = await Courses.find(filter);
        const count_page = Math.ceil((await Courses.find(filter).count()) / limitPageDataVeb) - 1;

        for (let i = 0; i < data.length; i++) {
            data[i].info_tooltip = await UserCourse.find({
                course_id: data[i]._id,
            }, { date_start: 1, user_name: 1, user_id: 1, proc_lessons: 1 });
            if (data[i].info_tooltip && data[i].info_tooltip?.length && data[i].length_lessons !== 0) {
                for (let j = 0; j < data[i].info_tooltip?.length; j++) {
                    data[i].info_tooltip[j].proc_lessons = Math.round((await UserLessonCourse.find({
                        user_course_id: data[i].info_tooltip[j]._id,
                        user_id: data[i].info_tooltip[j].user_id
                    }).count() / data[i].length_lessons * 100) * 100) / 100;
                }
            }

            // Отсортировать по дате по убыванию
        }

        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page});

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_mini_list_courses = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let data = await Courses.find({}, "_id access label");
        res.status(201).json(data);

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_lessons_course = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let data = await LessonsCourses.find({course_id: req.params.id});
        res.status(201).json(data);

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_questions_test = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let data = await QuestionsTest.find({test_id: req.params.id});
        res.status(201).json(data);

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_meditation = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        const page = (Number(req.params.page)) * limitPageDataVeb;
        const filter = req.params.label ? (req.params.label !== "null" ? {label: req.params.label} : {}) : {};
        const data = await Video.find({category: "meditation", ...filter}, null, { skip: page, limit: limitPageDataVeb });
        const count_page = Math.ceil((await Video.find({category: "meditation", ...filter}).count()) / limitPageDataVeb) - 1;
        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page});

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_musictherapys = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let list_mus = [];
        let musictherapys = await User.find({type_admin: 'Музыкотерапевт'});
        for (let i = 0; i < musictherapys.length; i++) {
            list_mus.push({
                id: musictherapys[i]._id,
                name: musictherapys[i].name + ' ' + musictherapys[i].fullName,
            })
        }

        res.status(201).json(list_mus);
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_notes = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }
        const {id_user} = req.params;
        const data = await Notes.find({id_user});
        res.status(201).json(data);
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_statistics_test = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }
        const {id_user} = req.params;
        let tests = await Test.find();
        let result_data = [];
        for (let index = 0; index < tests.length; index++) {
            let item_result = await UserTest.find({
                user_id: id_user,
                test_id: tests[index]._id,
                status: true
            });
            if (item_result && item_result.length) {
                let data_list;
                for (let j = 0; j < item_result?.length; j++) {
                    data_list = JSON.parse(JSON.stringify(await QuestionsTest.find({
                        test_id: item_result[j].test_id,
                    })));
                    for (let i = 0; i < data_list?.length; i++) {
                        data_list[i].answer = await UserQuestionTest.findOne({
                            user_id: id_user,
                            test_id: item_result[j].test_id,
                            user_test_id: item_result[j]._id,
                            question_test_id: data_list[i]._id
                        });
                    }
                    item_result[j].data = data_list;
                    item_result[j].test = await Test.findOne({_id: item_result[j].test_id});
                }
                result_data.push({
                    label: tests[index].label,
                    result: item_result,
                });
            }
        }


        // let result = await UserTest.find({
        //     user_id: id_user,
        //     status: true
        // });

        res.status(201).json(result_data);
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_classic = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        const page = (Number(req.params.page)) * limitPageDataVeb;
        const filter = req.params.label ? (req.params.label !== "null" ? {label: req.params.label} : {}) : {};
        const data = await Video.find({category: "classic", ...filter}, null, { skip: page, limit: limitPageDataVeb });
        const count_page = Math.ceil((await Video.find({category: "classic", ...filter}).count()) / limitPageDataVeb) - 1;
        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page});

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.users_sort = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        const page = (Number(req.body.data.page)) * limitPageDataVeb;
        let filter = req.body.data.full_name ? (req.body.data.full_name !== "null" ? {fullName: {$regex: req.body.data.full_name}} : {}): {};

        if (req.body.data.is_admin && req.body.data.is_admin !== "null") filter.is_admin = req.body.data.is_admin === "true";
        if (req.body.data.access && req.body.data.access !== "null") filter.access = req.body.data.access;
        if (req.body.data.language && req.body.data.language !== "null") filter.language = req.body.data.language;

        let data = await User.find(filter, null, { skip: page, limit: limitPageDataVeb }).sort({ [req.body.sortData.value]: req.body.status ? 1 : -1 });
        const count_page = Math.ceil((await User.find(filter).count()) / limitPageDataVeb) - 1;
        const count_data = await User.find().count();

        for (let i = 0; i < data.length; i++) {
            data[i].questionnaire = await Questionnaire.findOne({id_user: data[i]._id.toString()});
            data[i].counter_video = await LogData.find({id_user: data[i]._id.toString(), type: "video"}).count();
            data[i].counter_audio = await LogData.find({id_user: data[i]._id.toString(), type: "audio"}).count();
        }

        res.status(201).json({data, page: Number(req.body.data.page), count_page, end_page: count_page <= page, count_data});

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_user_fin = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        const page = (Number(req.params.page)) * limitPageDataVeb;
        // let initFilter = {'musicTherapy.id': check.id};
        // const filter = req.params.full_name ? (req.params.full_name !== "null" ? {fullName: req.params.full_name} : {}): {};
        let filter = req.params.full_name ? (req.params.full_name !== "null" ? {fullName: {$regex: req.params.full_name}} : {}): {};
        filter['musicTherapy.id'] = check.id;

        if (req.params.is_admin && req.params.is_admin !== "null") filter.type_admin = req.params.is_admin;
        if (req.params.access && req.params.access !== "null") filter.access = req.params.access;
        if (req.params.language && req.params.language !== "null") filter.language = req.params.language;

        // let data = await User.find(filter, null, { skip: page, limit: limitPageDataVeb });
        let data = await User.find(filter);
        const count_page = Math.ceil((await User.find(filter).count()) / limitPageDataVeb) - 1;
        const count_data = await User.find(filter).count();

        for (let i = 0; i < data.length; i++) {
            data[i].questionnaire = await Questionnaire.findOne({id_user: data[i]._id.toString()});
            data[i].counter_video = await LogData.find({id_user: data[i]._id.toString(), type: "video"}).count();
            data[i].counter_audio = await LogData.find({id_user: data[i]._id.toString(), type: "audio"}).count();
        }

        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page, count_data});

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_user = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        const page = (Number(req.params.page)) * limitPageDataVeb;
        // const filter = req.params.full_name ? (req.params.full_name !== "null" ? {fullName: req.params.full_name} : {}): {};
        let filter = req.params.full_name ? (req.params.full_name !== "null" ? {fullName: {$regex: req.params.full_name}} : {}): {};

        if (req.params.is_admin && req.params.is_admin !== "null") filter.type_admin = req.params.is_admin;
        if (req.params.access && req.params.access !== "null") filter.access = req.params.access;
        if (req.params.language && req.params.language !== "null") filter.language = req.params.language;

        // let data = await User.find(filter, null, { skip: page, limit: limitPageDataVeb });
        let data = await User.find(filter);
        const count_page = Math.ceil((await User.find(filter).count()) / limitPageDataVeb) - 1;
        const count_data = await User.find(filter).count();

        for (let i = 0; i < data.length; i++) {
            data[i].questionnaire = await Questionnaire.findOne({id_user: data[i]._id.toString()});
            data[i].counter_video = await LogData.find({id_user: data[i]._id.toString(), type: "video"}).count();
            data[i].counter_audio = await LogData.find({id_user: data[i]._id.toString(), type: "audio"}).count();
        }

        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page, count_data});

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.re_user = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let new_data = await User.findOne({_id: req.body._id});

        Object.entries(req.body.data).forEach(item => {
            new_data[item[0]] = item[1]
        });

        if (req.body.data.notes !== undefined) {
            await Notes.deleteMany({id_user: req.body._id});
            let new_notes = null;
            for(let i = 0; i < req.body.data.notes.length; i++) {
                new_notes = new Notes({
                    ...req.body.data.notes[i],
                    id_user: req.body._id,
                    note_writer_name: candidate.fullName + ' ' + candidate.name,
                });
                await new_notes.save();
            }
        }

        if (req.body.data.password) new_data.password = req.body.data.password;
        if (req.body.data.settings) {
            Object.entries(req.body.data.settings).forEach(item => {
                new_data[item[0]] = item[1]
            });
        }
        await new_data.save();

        if (req.body.data.questionnaire) {
            let questionnaire = await Questionnaire.findOne({id_user: req.body._id.toString()});

            if (questionnaire) {
                Object.entries(req.body.data.questionnaire).forEach(item => {
                    questionnaire[item[0]] = item[1]
                });
            } else {
                questionnaire = new Questionnaire({
                    id_user: req.body._id.toString(),
                    ...req.body.data.questionnaire,
                    status: false,
                });
            }

            await questionnaire.save();
        }

        res.status(201).json(new_data);

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.re_audio = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {

            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let new_data = await Audio.findOne({_id: req.body._id});
        Object.entries(req.body.data).forEach(item => {
            new_data[item[0]] = item[1]
        });
        await new_data.save();

        res.status(201).json(new_data);

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.re_video = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let new_data = await Video.findOne({_id: req.body._id});

        Object.entries(req.body.data).forEach(item => {
            new_data[item[0]] = item[1]
        });
        await new_data.save();

        res.status(201).json(new_data);

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.re_map = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let new_data = await Maps.findOne({_id: req.body._id});

        Object.entries(req.body.data).forEach(item => {
            new_data[item[0]] = item[1]
        });
        await new_data.save();

        res.status(201).json(new_data);

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.re_test = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let new_data = await Test.findOne({_id: req.body._id});
        if (req.body.data.questions !== undefined) {
            await QuestionsTest.deleteMany({test_id: req.body._id});
            new_data.length_questions = req.body.data.questions?.length;
        }

        Object.entries(req.body.data).forEach(item => {
            new_data[item[0]] = item[1]
        });

        await new_data.save();

        // if (req.body.data.questions) {
        //     let new_lesson;
        //     for(let i = 0; i < req.body.data.questions.length; i++) {
        //         new_lesson = new QuestionsTest({
        //             test_id: req.body._id,
        //             ...req.body.data.questions[i]
        //         });
        //         await new_lesson.save();
        //     }
        // }
        if (req.body.data.questions) {
            let new_question = null;
            for(let i = 0; i < req.body.data.questions.length; i++) {
                new_question = new QuestionsTest({
                    ...req.body.data.questions[i],
                    test_id: new_data._id,
                    number: i,
                    length_questions: req.body.data.questions.length,
                });
                await new_question.save();
            }
        }

        res.status(201).json(new_data);

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.re_course = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let new_data = await Courses.findOne({_id: req.body._id});
        if (req.body.data.lessons !== undefined) {
            await LessonsCourses.deleteMany({course_id: req.body._id});
            new_data.length_lessons = req.body.data.lessons?.length;
        }

        Object.entries(req.body.data).forEach(item => {
            new_data[item[0]] = item[1]
        });

        await new_data.save();

        // if (req.body.data.lessons) {
        //     let prev_lesson = null;
        //     let new_lesson = null;
        //     for(let i = 0; i < req.body.data.lessons.length; i++) {
        //         new_lesson = new LessonsCourses({
        //             course_id: req.body._id,
        //             prev_id: prev_lesson ? prev_lesson._id : null,
        //             ...req.body.data.lessons[i]
        //         });
        //         if (prev_lesson) {
        //             prev_lesson.next_id = new_lesson._id;
        //         }
        //         prev_lesson = new_lesson;
        //         await new_lesson.save();
        //     }
        // }
        if (req.body.data.lessons) {
            let new_lesson = null;
            for(let i = 0; i < req.body.data.lessons.length; i++) {
                new_lesson = new LessonsCourses({
                    ...req.body.data.lessons[i],
                    course_id: req.body._id,
                    number: i,
                    length_lessons: req.body.data.lessons.length,
                });
                await new_lesson.save();
            }
        }

        res.status(201).json(new_data);

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.re_live_sound = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let new_data = await LiveSound.findOne({_id: req.body._id});

        Object.entries(req.body.data).forEach(item => {
            new_data[item[0]] = item[1]
        });
        await new_data.save();

        res.status(201).json(new_data);

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.delete_live_sound = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let delete_data = await LiveSound.findOne({_id: req.body._id});

        // await fs.unlink(`./${delete_data.img}`, (err) => {
        //     if (err)
        // }).catch();

        await delete_data.delete();

        res.status(201).json('OK');

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.delete_user = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let delete_data = await User.findOne({_id: req.body._id});

        await delete_data.delete();

        res.status(201).json('OK');

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.delete_audio = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let delete_data = await Audio.findOne({_id: req.body._id});

        await delete_data.delete();

        res.status(201).json('OK');

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }

}

module.exports.delete_video = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }
        let candidate = await User.findOne({_id: check.id});

        let delete_data = await Video.findOne({_id: req.body._id});


        await delete_data.delete();
        res.status(201).json('OK');

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.delete_map = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }
        let candidate = await User.findOne({_id: check.id});

        let delete_data = await Maps.findOne({_id: req.body._id});

        await delete_data.delete();
        res.status(201).json('OK');

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.delete_test = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let delete_data = await Test.findOne({_id: req.body._id});
        let delete_dop = await QuestionsTest.find({test_id: req.body._id});

        await fs.unlink(`./${delete_data.poster}`, (err) => {
            if (err) console.log("no delete!!!!");
        });

        for(let i = 0; i < delete_dop?.length; i++) {
            await fs.unlink(`./${delete_dop[i].img}`, (err) => {
                if (err) console.log("no delete!!!!");
            });
        }

        if (delete_data) await delete_data.delete();
        if (delete_dop.length) await QuestionsTest.remove({course_id: req.body._id});

        res.status(201).json('OK');

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.delete_course = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let delete_data = await Courses.findOne({_id: req.body._id});
        let delete_dop = await LessonsCourses.find({course_id: req.body._id});

        await fs.unlink(`./${delete_data?.poster}`, (err) => {
            if (err) console.log("no delete!!!!");
        });
        for(let i = 0; i < delete_dop?.length; i++) {
            await fs.unlink(`./${delete_dop[i].video}`, (err) => {
                if (err) console.log("no delete!!!!");
            });
        }

        if (delete_data) await delete_data.delete();
        if (delete_dop.length) await LessonsCourses.remove({course_id: req.body._id});
        res.status(201).json('OK');

        let candidate = await User.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_translation = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});
        let translations = await Translation.findOne({root: 0});
        res.status(201).json(translations);
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_translation_admin = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});
        let translations = await Translation.findOne({root: 1});
        res.status(201).json(translations);
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.re_translation = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let translations = await Translation.findOne({root : 0});

        if (translations) {
            Object.entries(req.body.data).forEach(item => {
                translations[item[0]] = item[1].length ? item[1] : null
            });
        } else {
            translations = new Translation({
                root: 0,
                ...req.body.data,
            })
        }
        await translations.save();

        res.status(201).json({translations});

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.re_translation_admin = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let translations = await Translation.findOne({root : 1});


        if (translations) {
            Object.entries(req.body.data).forEach(item => {
                translations[item[0]] = item[1] && item[1].length ? item[1] : null
            });
        } else {
            translations = new Translation({
                root: 1,
                ...req.body.data,
            })
        }
        await translations.save();

        res.status(201).json({translations});

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.re_version = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        let version = await Version.findOne({root : 0});

        if (version) {
            Object.entries(req.body.data).forEach(item => {
                version[item[0]] = item[1]
            });
        } else {
            version = new Version({
                root: 0,
                ...req.body.data,
            })
        }
        await version.save();

        res.status(201).json({version});

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.reordering = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await User.findOne({_id: check.id});

        const {table_name, id_1, id_2} = req.body;
        let set_number = 0;
        let data_1 = null;
        let data_2 = null;

        switch (table_name) {
            case 'video':
                data_1 = await Video.findById(id_1);
                data_2 = await Video.findById(id_2);
                break;
            case 'audio':
                data_1 = await Audio.findById(id_1);
                data_2 = await Audio.findById(id_2);
                break;
            case 'live_sound':
                data_1 = await LiveSound.findById(id_1);
                data_2 = await LiveSound.findById(id_2);
                break;
        }

        if (data_1 && data_2) {
            set_number = data_1.number;
            data_1.number = data_2.number;
            data_2.number = set_number;

            await data_1.save();
            await data_2.save();
        }

        res.status(201).json("OK");

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}
