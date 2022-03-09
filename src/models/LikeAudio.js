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
});

module.exports = model('LikeAudio', likeAudioSchema);
