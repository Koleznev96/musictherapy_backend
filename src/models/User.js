const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    date_last_activity: {
        type: Date,
        required: false,
    },
    registration_date: {
        type: Date,
        required: false,
    },
});

module.exports = model('User', userSchema);
