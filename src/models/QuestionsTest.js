const {Schema, model} = require('mongoose');

const questionsTestSchema = new Schema({
    test_id: {
        type: String,
        required: false,
    },
    label: [
        {
            language: String,
            value: String,
        },
    ],
    img: String,
    question: [
        {
            language: String,
            value: String,
        },
    ],
    answers: [
        {
            label: String,
            balls: Number,
            is_status: Boolean,
        },
    ],
    number: {
        type: Number,
        required: false,
    },
    length_questions: {
        type: Number,
        required: false,
    },
    answer: {
        type: JSON,
        required: false,
    }
});

module.exports = model('QuestionsTest', questionsTestSchema);
