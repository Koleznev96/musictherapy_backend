const {Schema, model} = require('mongoose');

const videoSchema = new Schema({
    label: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: false,
    },
    text: {
        type: String,
        required: false,
    },
    video: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
});

module.exports = model('Video', videoSchema);
