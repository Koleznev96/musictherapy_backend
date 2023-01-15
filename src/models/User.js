const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: false,
    },
    language: {
        type: String,
        required: false,
    },
    password: {
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
        required: false,
    },
    date_last_activity: {
        type: Date,
        required: false,
    },
    access: {
        type: String,
        required: false,
    },
    registration_date: {
        type: Date,
        required: false,
    },
    token: {
        type: String,
        required: false,
    },
    questionnaire: {
        type: JSON,
        required: false,
    },
    available_courses: [
        {
            course_id: String,
            start_date: Date,
            end_date: Date,
        }
    ],
    amount_activity: {
        type: Number,
        required: false,
    },
    counter_video: {
        type: Number,
        required: false,
    },
    counter_audio: {
        type: Number,
        required: false,
    },
    is_admin: {
        type: Boolean,
        required: false,
    },
    // Делаю из Boolean в String
    type_admin: {
        type: String,
        required: false,
    },
    codeCheck: {
        type: String,
        required: false,
    },
    isNoCheck: {
        type: Boolean,
        required: false,
    },
    status: {
        type: Boolean,
        required: false,
    },
    musicTherapy: {
        id: String,
        name: String,
    },
});

module.exports = model('User', userSchema);
