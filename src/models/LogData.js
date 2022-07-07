const {Schema, model} = require('mongoose');

const logDataSchema = new Schema({
    id_user: {
        type: String,
        required: false,
    },
    id_data: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

module.exports = model('LogData', logDataSchema);
