const {Schema, model} = require('mongoose');

const notesSchema = new Schema({
    id_user: {
        type: String,
        required: true,
    },
    note_writer_name: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
    label: {
        type: String,
        required: false,
    },
    text: {
        type: String,
        required: false,
    },
});

module.exports = model('Notes', notesSchema);
