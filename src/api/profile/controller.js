const errorHandler = require('../../utils/errorHandler');
const User = require('../../models/User');

module.exports.get_data = async function(req, res) {
    try {
        let data = await User.findOne({_id: req.user.id});
        data.date_last_activity = new Date();
        await data.save();
        res.status(201).json(data);
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}
