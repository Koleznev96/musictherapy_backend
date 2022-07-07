const {Schema, model} = require('mongoose');

const likeAudioSchema = new Schema({
    id_root: {
        type: String,
        required: false,
    },
    id_user: {
        type: String,
        required: false,
    },
    user_name: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
});

module.exports = model('LikeAudio', likeAudioSchema);
