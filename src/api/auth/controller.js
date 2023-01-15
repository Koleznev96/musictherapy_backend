const errorHandler = require("../../utils/errorHandler");
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");
const emailTransport = require("../../middleware/emailTransport");

const User = require("../../models/User");
const Code = require("../../models/Code");

const sendEmail = async function (email, message, res) {
    const mailOptions = {
        to: email,
        subject: "Активация аккаунта Музыкотерапия",
        html: message,
    };
    await emailTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log("emailTransport-", error);
            res.end("error");
        }
    });
};

module.exports.login = async function (req, res) {
    let candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
        const passwordResult = req.body.password === candidate.password;
        if (candidate.status) {
            res.status(409).json({
                errors: [
                    ["email", "такой аккаунт не существует."],
                    ["password", "такой аккаунт не существует."],
                ],
            });
            return;
        }
        if (passwordResult) {
            // const token = jwt.sign({
            //     email: candidate.email,
            //     userId: candidate._id,
            // }, keys.jwt, {expiresIn: 60000 * 60000});

            const token = "sdfgsdgf456fdgs" + candidate._id;

            candidate.token = `Bearer ${token}`;
            candidate.date_last_activity = new Date();
            await candidate.save();

            res.status(200).json({
                token: `Bearer ${token}`,
            });
        } else {
            res.status(409).json({
                errors: [
                    ["email", "PasswordOrE-mailError"],
                    ["password", "PasswordOrE-mailError"],
                ],
            });
        }
    } else {
        res.status(409).json({
            errors: [
                ["email", "PasswordOrE-mailError"],
                ["password", "PasswordOrE-mailError"],
            ],
        });
    }
};

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
        if (!candidate.isNoCheck) {
            res.status(409).json({
                errors: [["email", "UserAlreadyRegistered"]],
            });
        } else {
            // Отправляем Письмо с кодом
            const message_ =
                req.body.name +
                ", подтверждаем вашу регистрацию в приложении «Музыкотерапия»." +
                "<br><br>Код активации: " +
                candidate.codeCheck.toString() +
                "<br><br>Приятного использования!" +
                "<br><br>По всем вопросам Вы можете обращаться в службу поддержки – info@musictherapy.by или по телефону/вайбер/телеграм +375(44)464-73-47." +
                "<br>--" +
                "<br>www.MusicTherapy.by";
            await sendEmail(req.body.email, message_, res);
            res.status(201).json({ tokenCode: req.body.email });
            // res.status(409).json({
            //     errors: [['no_check', 'E-mailAlreadyRegistered']]
            // });
        }
    } else {
        // const tokenCode = req.body.email + '-' + new Date();
        // await Code.deleteMany({tokenCode: tokenCode});
        const code = Math.floor(Math.random() * (999999 - 100000)) + 100000;

        const date = new Date();
        const user = new User({
            email: req.body.email,
            language: req.body.language ? req.body.language : "ru",
            password: req.body.password,
            name: req.body.name,
            fullName: req.body.fullName,
            telephone: req.body.telephone,
            date_last_activity: date,
            registration_date: date,
            access: "Гость",
            codeCheck: code,
            isNoCheck: true,
            is_admin: false,
            type_admin: "Клиент",
        });

        // const code_entry = new Code({
        //     tokenCode: tokenCode,
        //     code: code.toString(),
        // });

        // Отправляем Письмо с кодом
        const message =
            req.body.name +
            ", подтверждаем вашу регистрацию в приложении «Музыкотерапия»." +
            "<br><br>Код активации: " +
            code.toString() +
            "<br><br>Приятного использования!" +
            "<br><br>По всем вопросам Вы можете обращаться в службу поддержки – info@musictherapy.by или по телефону/вайбер/телеграм +375(44)464-73-47." +
            "<br>--" +
            "<br>www.MusicTherapy.by";
        await sendEmail(req.body.email, message, res);

        try {
            await user.save();
            res.status(201).json({ tokenCode: req.body.email });
        } catch (e) {
            errorHandler(res, e);
            // throw e;
        }
    }
};

module.exports.register_old = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
        res.status(409).json({
            errors: [["email", "E-mailAlreadyRegistered"]],
        });
    } else {
        const code = "111111";

        const date = new Date();
        const user = new User({
            email: req.body.email,
            language: req.body.language ? req.body.language : "ru",
            password: req.body.password,
            name: req.body.name,
            fullName: req.body.fullName,
            telephone: req.body.telephone,
            date_last_activity: date,
            registration_date: date,
            access: "Гость",
            codeCheck: code,
            isNoCheck: true,
            is_admin: false,
            type_admin: "Клиент",
        });

        try {
            await user.save();
            res.status(201).json({ tokenCode: req.body.email });
        } catch (e) {
            errorHandler(res, e);
            // throw e;
        }
    }
};

module.exports.code_check = async function (req, res) {
    try {
        let candidate = await User.findOne({ email: req.body.email });
        if (
            !candidate.codeCheck.length ||
            candidate.codeCheck.toString() !== req.body.code.toString()
        ) {
            return res.status(409).json({
                errors: [["code", "CodeError"]],
            });
        }

        // const date = new Date();
        // const user = new User({
        //     email: req.body.email,
        //     language: req.body.language ? req.body.language : 'ru',
        //     password: req.body.password,
        //     name: req.body.name,
        //     fullName: req.body.fullName,
        //     telephone: req.body.telephone,
        //     date_last_activity: date,
        //     registration_date: date,
        //     access: "Гость"
        // });

        candidate.codeCheck = "";
        candidate.isNoCheck = false;
        // const token = jwt.sign({
        //     email: req.body.email,
        //     userId: user._id,
        // }, keys.jwt, {expiresIn: 60000 * 60000});
        const token = "sdfgsdgf456fdgs" + candidate._id;

        candidate.token = `Bearer ${token}`;
        await candidate.save();

        res.status(201).json({
            token: `Bearer ${token}`,
        });
    } catch (e) {
        errorHandler(res, e);
        // throw e;
    }
};

module.exports.help_password = async function (req, res) {
    // Воставновление пароля
    try {
        const candidate = await User.findOne({ email: req.body.email });
        if (!candidate) {
            return res.status(401).json({
                errors: [["email", "E-mailNotRegistered"]],
            });
        }

        // Отправляем Письмо с паролем
        const message = "Ваш пароль: " + candidate.password;
        await sendEmail(req.body.email, message, res);

        res.status(201).json("OK");
    } catch (e) {
        errorHandler(res, e);
        // throw e;
    }
};

module.exports.get_data = async function (req, res) {
    try {
        const data = await Code.find();
        res.status(201).json(data);
    } catch (e) {
        errorHandler(res, e);
        // throw e;
    }
};
