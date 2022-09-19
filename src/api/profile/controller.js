const errorHandler = require('../../utils/errorHandler');
const User = require('../../models/User');
const Questionnaire = require('../../models/Questionnaire');
const Translation = require('../../models/Translation');
const checkUser = require("../auth/authUser");
var fs = require('fs');

module.exports.get_data = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        if (!check._id) {
            return res.status(401).json('Unauthorized');
        }

        const questionnaire = await Questionnaire.findOne({id_user: check._id.toString()});

        check.date_last_activity = new Date();
        await check.save();
        res.status(201).json({data: check, questionnaire});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.re_data = async function(req, res) {
    try {
        let check = await checkUser.check(req, res);
        if (!check._id) {
            return res.status(401).json('Unauthorized');
        }

        let questionnaire = await Questionnaire.findOne({id_user: check._id.toString()});

        if (req.body.data) {
            Object.entries(req.body.data).forEach(item => {
                check[item[0]] = item[1]
            });

            await check.save();
        }

        if (req.body.questionnaire) {
            if (questionnaire) {
                Object.entries(req.body.questionnaire).forEach(item => {
                    questionnaire[item[0]] = item[1]
                });
            } else {
                questionnaire = new Questionnaire({
                    id_user: check._id.toString(),
                    ...req.body.questionnaire,
                });
            }

            await questionnaire.save();
        }

        check.date_last_activity = new Date();
        await check.save();
        res.status(201).json({data: check, questionnaire});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.delete_account = async function(req, res) {
    try {
        let check = await checkUser.check(req, res);
        if (!check._id) {
            return res.status(401).json('Unauthorized');
        }
        check.status = true;
        check.date_last_activity = new Date();
        await check.save();
        res.status(201).json('OK');
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.translation = async function(req, res) {
    try {
        const language = req.params.language;

        let check = await checkUser.check(req, res);
        if (check._id) {
            check.language = language;
            await check.save();
        }

        const translation = await Translation.findOne({root: 0});
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
