const errorHandler = require('../../utils/errorHandler');
const LiveSound = require('../../models/LiveSound');
const Video = require('../../models/Video');
const Audio = require('../../models/Audio');
const Admin = require('../../models/Admin');
const User = require('../../models/User');
const Questionnaire = require('../../models/Questionnaire');
const LikeVideo = require('../../models/LikeVideo');
const LikeAudio = require('../../models/LikeAudio');
const Translation = require('../../models/Translation');
const Version = require('../../models/Version');
const checkAdmin = require('./authAdmin');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const {limitPageDataVeb} = require("../../utils/dataConst");
const nodemailer = require("nodemailer");
var fs = require('fs');


module.exports.register = async function(req, res) {
    try {
        const date = new Date();

        let admin = new Admin({
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
    let candidate = await Admin.findOne({email: req.body.email});
    if (candidate) {
        const passwordResult = req.body.password === candidate.password;
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
            }, keys.jwt, {expiresIn: 60000 * 60000});

            candidate.date_last_activity = new Date();
            candidate.token = `Bearer ${token}`;
            await candidate.save();

            res.status(200).json({
                token: `Bearer ${token}`
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

        let candidate = await Admin.findOne({_id: check.id});

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

        let candidate = await Admin.findOne({_id: check.id});

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

module.exports.create_live_sound = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await Admin.findOne({_id: check.id});

        const new_data = new LiveSound({
            ...req.body.data,
            date: new Date()
        });

        candidate.date_last_activity = new Date();

        await candidate.save();
        await new_data.save();

        return res.status(201).json(new_data);
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

        let candidate = await Admin.findOne({_id: check.id});
        const new_data = new Audio({
            ...req.body.data,
            date: new Date()
        });

        candidate.date_last_activity = new Date();

        await candidate.save();
        await new_data.save();

        return res.status(201).json(new_data);
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

        let candidate = await Admin.findOne({_id: check.id});

        const new_data = new Video({
            ...req.body.data,
            date: new Date()
        });

        candidate.date_last_activity = new Date();

        await candidate.save();
        await new_data.save();

        return res.status(201).json(new_data);
    } catch(e) {
        errorHandler(res, e);
        // throw e;
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
        const data = await LiveSound.find(filter, null, { skip: page, limit: limitPageDataVeb });
        const count_page = Math.ceil((await LiveSound.find(filter).count()) / limitPageDataVeb) - 1;
        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page});

        let candidate = await Admin.findOne({_id: check.id});
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
        const data = await Audio.find(filter, null, { skip: page, limit: limitPageDataVeb });
        const count_page = Math.ceil((await Audio.find(filter).count()) / limitPageDataVeb) - 1;

        for (let i = 0; i < data?.length; i++) {
            data[i].like = await LikeAudio.find({id_root: data[i]._id.toString()}).count();
        }

        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page});

        let candidate = await Admin.findOne({_id: check.id});
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
        let data = await Video.find(filter, null, { skip: page, limit: limitPageDataVeb });
        const count_page = Math.ceil((await Video.find(filter).count()) / limitPageDataVeb) - 1;

        for (let i = 0; i < data?.length; i++) {
            data[i].like = await LikeVideo.find({id_root: data[i]._id.toString()}).count();
        }

        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page});

        let candidate = await Admin.findOne({_id: check.id});
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

        let candidate = await Admin.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
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

        let candidate = await Admin.findOne({_id: check.id});
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
        const filter = req.params.full_name ? (req.params.full_name !== "null" ? {fullName: {$regex: req.params.full_name}} : {}): {};
        let data = await User.find(filter, null, { skip: page, limit: limitPageDataVeb });
        const count_page = Math.ceil((await User.find(filter).count()) / limitPageDataVeb) - 1;

        for (let i = 0; i < data.length; i++) {
            data[i].questionnaire = await Questionnaire.findOne({id_user: data[i]._id.toString()});
        }

        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page});

        let candidate = await Admin.findOne({_id: check.id});
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

        let candidate = await Admin.findOne({_id: check.id});

        let new_data = await User.findOne({_id: req.body._id});

        Object.entries(req.body.data).forEach(item => {
            new_data[item[0]] = item[1]
        });

        if (req.body.password) new_data.password = req.body.password;
        if (req.body.settings) {
            Object.entries(req.body.settings).forEach(item => {
                new_data[item[0]] = item[1]
            });
        }
        await new_data.save();

        if (req.body.questionnaire) {
            let questionnaire = await Questionnaire.findOne({id_user: req.body._id.toString()});

            if (questionnaire) {
                Object.entries(req.body.questionnaire).forEach(item => {
                    questionnaire[item[0]] = item[1]
                });
            } else {
                questionnaire = new Questionnaire({
                    id_user: req.body._id.toString(),
                    ...req.body.questionnaire,
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

        let candidate = await Admin.findOne({_id: check.id});

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

        let candidate = await Admin.findOne({_id: check.id});

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

module.exports.re_live_sound = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await Admin.findOne({_id: check.id});

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

        let candidate = await Admin.findOne({_id: check.id});

        let delete_data = await LiveSound.findOne({_id: req.body._id});

        // await fs.unlink(`./${delete_data.img}`, (err) => {
        //     if (err) console.log("no delete!!!!");
        // }).catch((e) => console.log(e));

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

        let candidate = await Admin.findOne({_id: check.id});

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

        let candidate = await Admin.findOne({_id: check.id});

        let delete_data = await Audio.findOne({_id: req.body._id});

        // await fs.unlink(`./${delete_data.video}`, (err) => {
        //     if (err) console.log("no delete!!!!");
        // }).catch((e) => console.log(e));
        //
        // await fs.unlink(`./${delete_data.poster}`, (err) => {
        //     if (err) console.log("no delete!!!!");
        // }).catch((e) => console.log(e));

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

        let candidate = await Admin.findOne({_id: check.id});

        let delete_data = await Video.findOne({_id: req.body._id});

        // await fs.unlink(`./${delete_data.video}`, (err) => {
        //     if (err) console.log("no delete!!!!");
        // }).catch((e) => console.log(e));
        //
        // await fs.unlink(`./${delete_data.poster}`, (err) => {
        //     if (err) console.log("no delete!!!!");
        // }).catch((e) => console.log(e));

        await delete_data.delete();

        res.status(201).json('OK');

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }

}

module.exports.test_email = async function(req, res) {
    let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // host: "musictherapy.by",
        service: 'postfix',
        // host: "localhost",
        host: "admin.musictherapy.by",
        // port: 465,
        port: 25,
        secure: false, // true for 465, false for other ports
        // auth: {
        //     user: testAccount.user, // generated ethereal user
        //     pass: testAccount.pass, // generated ethereal password
        // },
        auth: {
            user: "root", // generated ethereal user
            pass: "BDA2YJj#tped", // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <businessdevelopermarket@gmail.com>', // sender address
        to: "fc.fenomen@mail.ru, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.status(201).json('OK');
}

module.exports.get_translation = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await Admin.findOne({_id: check.id});
        let translations = await Translation.findOne({root: 0});
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

        let candidate = await Admin.findOne({_id: check.id});

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

module.exports.re_version = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        let candidate = await Admin.findOne({_id: check.id});

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

