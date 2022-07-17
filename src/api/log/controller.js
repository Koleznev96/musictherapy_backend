const errorHandler = require('../../utils/errorHandler');
const checkUser = require('../auth/authUser');
const LogData = require("../../models/LogData");


const inaccurate_date_comparison = (date_1, date_2) => {
    date_1 = new Date(date_1);
    date_2 = new Date(date_2);

    if (date_1.getFullYear() !== date_2.getFullYear()) {
        return false;
    }
    if (date_1.getMonth() !== date_2.getMonth()) {
        return false;
    }
    if (date_1.getDate() !== date_2.getDate()) {
        return false;
    }
    return true;
}



module.exports.log_auth = async function(req, res) {
    try {
        let check = await checkUser.check(req, res);
        if (!check?._id) {
            return res.status(401).json('Unauthorized');
        }
        if (check.date_last_activity && !inaccurate_date_comparison(check.date_last_activity, new Date())) {
            check.amount_activity = check.amount_activity ? (check.amount_activity + 1) : 1;
        }
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