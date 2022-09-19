const {Schema, model} = require('mongoose');

const userTestSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    test_id: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    current_question: {
        type: Number,
        required: false,
    },
    result: {
        description: [
            {
                language: String,
                value: String,
            },
        ],
        balls: Number,
        // color: String,
    },
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
    data: {
        type: JSON,
        required: false,
    },
    test: {
        type: JSON,
        required: false,
    }
});

module.exports = model('UserTest', userTestSchema);
