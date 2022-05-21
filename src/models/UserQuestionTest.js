const {Schema, model} = require('mongoose');

const userQuestionTestSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    test_id: {
        type: String,
        required: true,
    },
    question_test_id: {
        type: String,
        required: true,
    },
    user_test_id: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: false,
    },
    answer: {
        type: String,
        required: false,
    },
    balls: {
        type: Number,
        required: false,
    },
    question: {
        type: JSON,
        required: false,
    }
});

module.exports = model('UserQuestionTest', userQuestionTestSchema);
