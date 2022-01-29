const Admin = require('../../models/Admin');


module.exports.check = async function(req, res) {
    let candidate = await Admin.findOne({token: req.headers['authorization']});
    if (candidate) {
        return {id: candidate._id};
    } else {
        return {error: 'error'};
    }
}
