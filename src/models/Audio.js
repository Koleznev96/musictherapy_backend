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
    instruments: [
        String
    ],
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
});

module.exports = model('Audio', audioSchema);
