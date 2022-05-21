const {Schema, model} = require('mongoose');

const lessonsCoursesSchema = new Schema({
    course_id: String,
    label: [
        {
            language: String,
            value: String,
        },
    ],
    poster: {
        type: String,
        required: false,
    },
    video: {
        type: String,
        required: false,
    },
    text: [
        {
            language: String,
            value: String,
        },
    ],
    number: {
        type: Number,
        required: false,
    },
    length_lessons: {
        type: Number,
        required: false,
    },
});

module.exports = model('LessonsCourses', lessonsCoursesSchema);
