const mongoose = require("mongoose")

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    artist: {
        type: String,
    },
    year: {
        type: String,
    }
});

module.exports = mongoose.model('albums', albumSchema)
