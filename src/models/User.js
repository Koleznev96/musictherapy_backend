const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: false,
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
});

module.exports = model('User', userSchema);
