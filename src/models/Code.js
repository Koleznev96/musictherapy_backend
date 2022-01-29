const {Schema, model} = require('mongoose');

const codeSchema = new Schema({
    tokenCode: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
});

module.exports = model('Code', codeSchema);
