const {Schema, model} = require('mongoose');

const testSchema = new Schema({
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
    result: [
        {
            start_balls: Number,
            end_balls: Number,
            description: [
                {
                    language: String,
                    value: String,
                },
            ],
            color: String,
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
    status_start: {
        type: JSON,
        required: false,
    },
    status_end: {
        type: JSON,
        required: false,
    },
    length_questions: {
        type: Number,
        required: false,
    },
    info_tooltip: {
        type: JSON,
        required: false,
    }
});

module.exports = model('Test', testSchema);
