const errorHandler = require('../../utils/errorHandler');
const checkUser = require('../auth/authUser');
const LogData = require("../../models/LogData");


module.exports.log_auth = async function(req, res) {
    try {
        let check = await checkUser.check(req, res);
        if (!check?._id) {
            return res.status(401).json('Unauthorized');
        }
        check.amount_activity = check.amount_activity ? (check.amount_activity + 1) : 1;
        await check.save();
        res.status(201).json("OK");
    } catch(e) {
        errorHandler(res, e);
        console.log('err-', e)
        // throw e;
    }
}

module.exports.log_play_data = async function(req, res) {
    try {
        let check = await checkUser.check(req, res);
        const {type, id} = req.body;
        const new_launcher = new LogData({
            id_user: check?._id ? check?._id : null,
            id_data: id,
            type,
            date: new Date(),
            user_name: check?._id ? check.fullName + ' ' + check.name : 'undefined',
        });
        await new_launcher.save();
        res.status(201).json("OK");
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}