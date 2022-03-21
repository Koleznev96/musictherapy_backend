const {Schema, model} = require('mongoose');

const QuestionnaireSchema = new Schema({
    id_user: {
        type: String,
        required: true,
    },
    date_birth: {
        type: Date,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    country_birth: {
        type: String,
        required: false,
    },
    country_residence: {
        type: String,
        required: false,
    },
    city_residence: {
        type: String,
        required: false,
    },
    music: [
        String
    ],
    nature: {
        type: String,
        required: false,
    },
    level: {
        type: String,
        required: false,
    },
    active_life: {
        type: String,
        required: false,
    },
    status: {
        type: Boolean,
        required: false,
    },
});

module.exports = model('Questionnaire', QuestionnaireSchema);
