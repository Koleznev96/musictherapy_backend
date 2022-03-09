const {Schema, model} = require('mongoose');

const likeVideoSchema = new Schema({
    id_root: {
        type: String,
        required: false,
    },
    id_user: {
        type: String,
        required: false,
    },
});

module.exports = model('LikeVideo', likeVideoSchema);
