const {Schema, model} = require('mongoose');

const userCourseSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    course_id: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    current_lesson: {
        type: Number,
        required: false,
    },
    result_description: [
        {
            language: String,
            value: String,
        },
    ],
    date_start: {
        type: Date,
        required: false,
    },
    date_end: {
        type: Date,
        required: false,
    },
    user_name: {
        type: String,
        required: false,
    },
    proc_lessons: {
        type: JSON,
        required: false,
    }
});

module.exports = model('UserCourse', userCourseSchema);
