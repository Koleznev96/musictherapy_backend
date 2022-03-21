const {Schema, model} = require('mongoose');

const videoSchema = new Schema({
    language: [
        String
    ],
    label: {
        type: String,
        required: false,
    },
    label_: [
        {
            language: String,
            value: String,
        },
    ],
    poster: {
        type: String,
        required: false,
    },
    poster_: [
        {
            language: String,
            value: String,
        },
    ],
    category: {
        type: String,
        required: false,
    },
    text: {
        type: String,
        required: false,
    },
    text_: [
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
    dostup: {
        type: String,
        required: false,
    }
});

module.exports = model('Video', videoSchema);
