const { Schema, model } = require("mongoose");

const playlistSchema = new Schema({
    language: [String],
    label: [
        {
            language: String,
            value: String,
        },
    ],
    text: [
        {
            language: String,
            value: String,
        },
    ],
    type_start: {
        type: String,
        required: false,
    },
    poster: {
        type: String,
        required: false,
    },
    access: [String],
    ids_audio: [String],
    ids_video: [String],
    counter_start: {
        type: Number,
        required: false,
    },
    // Settings - front
    settings: {
        type: JSON,
        required: false,
    },
    video_l: {
        type: Number,
        required: false,
    },
    audio_l: {
        type: Number,
        required: false,
    },
    custom_access: {
        type: JSON,
        required: false,
    },
});

module.exports = model("Playlist", playlistSchema);
