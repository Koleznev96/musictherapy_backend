const { Schema, model } = require("mongoose");

const translationsLengSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    translations_app: {
        type: String,
        required: false,
    },
    translations_admin: {
        type: String,
        required: false,
    },
});

module.exports = model("TranslationsLeng", translationsLengSchema);
