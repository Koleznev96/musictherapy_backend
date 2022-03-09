const errorHandler = require('../../utils/errorHandler');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');

const User = require('../../models/User');
const Code = require('../../models/Code');


module.exports.login = async function(req, res) {
    let candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        const passwordResult = req.body.password === candidate.password;
        if (passwordResult) {
            // const token = jwt.sign({
            //     email: candidate.email,
            //     userId: candidate._id,
            // }, keys.jwt, {expiresIn: 60000 * 60000});

            const token = 'sdfgsdgf456fdgs' + candidate._id;

            candidate.token = `Bearer ${token}`;
            candidate.date_last_activity = new Date();
            await candidate.save();

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(409).json({
                errors: [['email', 'Неверный пароль или e-mail.'], ['password', 'Неверный пароль или e-mail.']]
            });
        }
    }else {
        res.status(409).json({
            errors: [['email', 'Неверный пароль или e-mail.'], ['password', 'Неверный пароль или e-mail.']]
        });
    }
}

module.exports.register = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        res.status(409).json({
            errors: [['email', 'Такой e-mail уже занят.']]
        });
    } else {
        const tokenCode = req.body.email + '-' + new Date();
        // const code = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        const code = '111111';

        const code_entry = new Code({
            tokenCode: tokenCode,
            code: code.toString(),
        });

        // Отправляем Письмо с кодом

        try {
            await code_entry.save();
            res.status(201).json({tokenCode});
        } catch(e) {
            errorHandler(res, e);
            // throw e;
        }
    }
}

module.exports.code_check = async function(req, res) {
    try {
        const code_table = await Code.findOne({tokenCode: req.body.tokenCode});

        if (!code_table || (code_table.code.toString() != req.body.code.toString())) {
            return res.status(409).json({
                errors: [['code', 'Неверный код, попробуйте снова']]
            });
        }

        const date = new Date();
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            fullName: req.body.fullName,
            telephone: req.body.telephone,
            date_last_activity: date,
            registration_date: date,
            access: "Гость"
        });

        await code_table.delete();
        // const token = jwt.sign({
        //     email: req.body.email,
        //     userId: user._id,
        // }, keys.jwt, {expiresIn: 60000 * 60000});
        const token = 'sdfgsdgf456fdgs' + user._id;

        user.token = `Bearer ${token}`;
        await user.save();

        res.status(201).json({
            token: `Bearer ${token}`
        });
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.help_password = async function(req, res) {
    // Воставновление пароля
    try {
        const candidate = await User.findOne({email: req.body.email});
        if (!candidate) {
            return res.status(401).json({
                errors: [['email', 'Такой e-mail не зарегестрирован']]
            });
        }

        // Отправляем Письмо с паролем

        res.status(201).json('OK');
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}
