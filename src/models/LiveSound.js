const {Schema, model} = require('mongoose');

const liveSoundSchema = new Schema({
    language: [
        String
    ],
    label: {
        String,
        required: false,
    },
    label_: [
        {
            language: String,
            value: String,
        },
    ],
    img: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    date_event: {
        type: Date,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
});

module.exports = model('LiveSound', liveSoundSchema);
