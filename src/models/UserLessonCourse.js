const {Schema, model} = require('mongoose');

const userLessonCourseSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    course_id: {
        type: String,
        required: true,
    },
    course_lesson_id: {
        type: String,
        required: true,
    },
    user_course_id: {
        type: String,
        required: true,
    },
});

module.exports = model('UserLessonCourse', userLessonCourseSchema);
