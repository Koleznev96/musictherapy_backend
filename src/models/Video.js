const {Schema, model} = require('mongoose');

const videoSchema = new Schema({
    language: [
        String
    ],
    label: [
        {
            language: String,
            value: String,
        },
    ],
    poster: [
        {
            language: String,
            value: String,
        },
    ],
    category: {
        type: String,
        required: false,
    },
    text: [
        {
            language: String,
            value: String,
        },
    ],
    video: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: false,
    },
    access: [
        String,
    ],
    like: {
        type: Number,
        required: false,
    },
});

module.exports = model('Video', videoSchema);
