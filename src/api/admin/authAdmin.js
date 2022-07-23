const User = require('../../models/User');


module.exports.check = async function(req, res) {
    let candidate = await User.findOne({token: req.headers['authorization']});
    if (candidate && candidate.is_admin) {
        return {id: candidate._id};
    } else {
        return {error: 'error'};
    }
}
