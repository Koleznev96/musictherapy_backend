const errorHandler = require('../../utils/errorHandler');
const LiveSound = require('../../models/LiveSound');
const Video = require('../../models/Video');
const Admin = require('../../models/Admin');
const User = require('../../models/User');
const checkAdmin = require('./authAdmin');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const {limitPageDataVeb} = require("../../utils/dataConst");
const nodemailer = require("nodemailer");


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
        throw e;
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
        throw e;
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
        throw e;
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
        throw e;
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
        throw e;
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
        const filter = req.params.label ? (req.params.label !== "null" ? {label: req.params.label} : {}): {};
        const data = await LiveSound.find(filter, null, { skip: page, limit: limitPageDataVeb });
        const count_page = Math.ceil((await LiveSound.find(filter).count()) / limitPageDataVeb) - 1;
        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page});

        let candidate = await Admin.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}

module.exports.get_list_video = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        const page = (Number(req.params.page)) * limitPageDataVeb;
        const filter = req.params.label ? (req.params.label !== "null" ? {label: req.params.label} : {}): {};
        const data = await Video.find(filter, null, { skip: page, limit: limitPageDataVeb });
        const count_page = Math.ceil((await Video.find(filter).count()) / limitPageDataVeb) - 1;
        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page});

        let candidate = await Admin.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        throw e;
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
        throw e;
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
        throw e;
    }
}

module.exports.get_list_user = async function(req, res) {
    try {
        const check = await checkAdmin.check(req, res);
        if (!check.id) {
            return res.status(401).json('Unauthorized');
        }

        const page = (Number(req.params.page)) * limitPageDataVeb;
        const filter = req.params.full_name ? (req.params.full_name !== "null" ? {fullName: req.params.full_name} : {}): {};
        const data = await User.find(filter, null, { skip: page, limit: limitPageDataVeb });
        const count_page = Math.ceil((await User.find(filter).count()) / limitPageDataVeb) - 1;
        res.status(201).json({data, page: Number(req.params.page), count_page, end_page: count_page <= page});

        let candidate = await Admin.findOne({_id: check.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        throw e;
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
        await new_data.save();

        res.status(201).json(new_data);

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        throw e;
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
        throw e;
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
        throw e;
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

        await delete_data.delete();

        res.status(201).json('OK');

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        throw e;
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

        await delete_data.delete();

        res.status(201).json('OK');

        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}

module.exports.test_email = async function(req, res) {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "musictherapy.by",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
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

