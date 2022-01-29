const {Schema, model} = require('mongoose');

const liveSoundSchema = new Schema({
    label: {
        type: String,
        required: false,
    },
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
