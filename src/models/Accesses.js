const { Schema, model } = require("mongoose");

const accessesSchema = new Schema({
    id_content: {
        type: String,
        required: true,
    },
    id_user: {
        type: String,
        required: true,
    },
    type_content: {
        type: String,
        required: true,
    },
});

module.exports = model("Accesses", accessesSchema);
