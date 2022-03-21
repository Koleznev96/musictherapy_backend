const {Schema, model} = require('mongoose');

const versionSchema = new Schema({
    version: {
        type: String,
        required: true,
    },
    label: [
        {
            language: String,
            value: String,
        },
    ],
    root: {
        type: Number,
        required: true,
    },
});

module.exports = model('Version', versionSchema);
