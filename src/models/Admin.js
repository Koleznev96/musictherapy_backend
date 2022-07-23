const {Schema, model} = require('mongoose');

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
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
    is_admin: {
        type: Boolean,
        required: false,
    },
});

module.exports = model('Admin', adminSchema);
