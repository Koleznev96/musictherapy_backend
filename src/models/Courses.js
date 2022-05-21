const {Schema, model} = require('mongoose');

const coursesSchema = new Schema({
    language: [
        String
    ],
    access: [
        String,
    ],
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
    description: [
        {
            language: String,
            value: String,
        },
    ],
    instruction: [
        {
            language: String,
            value: String,
        },
    ],
    result_text: [
        {
            language: String,
            value: String,
        },
    ],
    like: {
        type: Number,
        required: false,
    },
    dostup: {
        type: String,
        required: false,
    },
    number: {
        type: Number,
        required: false,
    },
    status: {
        type: JSON,
        required: false,
    },
    avalibel: {
        type: Boolean,
        required: false,
    },
    object_date: {
        type: JSON,
        required: false,
    },
    length_lessons: {
        type: Number,
        required: false,
    },
    info_tooltip: {
        type: JSON,
        required: false,
    }
});

module.exports = model('Courses', coursesSchema);
