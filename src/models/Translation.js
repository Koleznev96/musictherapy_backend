const {Schema, model} = require('mongoose');

const translationSchema = new Schema({
    ru: {
        type: String,
        required: true,
    },
    com: {
        type: String,
        required: false,
    },
    root: {
        type: Number,
        required: false,
    }
});

module.exports = model('Translation', translationSchema);
