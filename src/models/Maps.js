const {Schema, model} = require('mongoose');

const mapsSchema = new Schema({
    language: [
        String
    ],
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
    number: {
        type: Number,
        required: false,
    },
});

module.exports = model('Maps', mapsSchema);
