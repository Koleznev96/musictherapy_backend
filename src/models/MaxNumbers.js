const {Schema, model} = require('mongoose');

const maxNumbersSchema = new Schema({
    table_name: {
        type: String,
        required: false,
    },
    number: {
        type: Number,
        required: false,
    },
});

module.exports = model('MaxNumbers', maxNumbersSchema);
