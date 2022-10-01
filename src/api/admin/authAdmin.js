const User = require('../../models/User');


module.exports.check = async function(req, res) {
    let candidate = await User.findOne({token: req.headers['authorization']});
    if (candidate && (candidate.type_admin === 'Администратор' || candidate.type_admin === 'Музыкотерапевт')) {
        return {id: candidate._id, candidate};
    } else {
        return {error: 'error'};
    }
}
