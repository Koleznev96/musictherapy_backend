const {Schema, model} = require('mongoose');

const audioSchema = new Schema({
    language: [
        String
    ],
    label: [
        {
            language: String,
            value: String,
        },
    ],
    category: {
        type: String,
        required: false,
    },
    genre: {
        type: String,
        required: false,
    },
    access: [
        String,
    ],
    instruments: [
        String
    ],
    level: {
        type: Number,
        required: false,
    },
    style: {
        type: String,
        required: false,
    },
    audio: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: false,
    },
    like: {
        type: Number,
        required: false,
    },
    number: {
        type: Number,
        required: false,
    },
    dostup: {
        type: String,
        required: false,
    },
    counter_start: {
        type: Number,
        required: false,
    },
    like_tooltip: {
        type: JSON,
        required: false,
    },
});

module.exports = model('Audio', audioSchema);
