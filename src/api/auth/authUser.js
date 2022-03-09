const User = require('../../models/User');


module.exports.check = async function(req, res) {
    if (req.headers['authorization']) {
        let candidate = await User.findOne({token: req.headers['authorization']});
        if (candidate) {
            return candidate;
        } else {
            return {error: 'error'};
        }
    } else {
        return {error: 'error'};
    }
}