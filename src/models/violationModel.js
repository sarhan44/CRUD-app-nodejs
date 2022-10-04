const mongoose = require('mongoose');

// create a new Schema object
const violationSchema = new mongoose.Schema({
    licensePlateNumber: { type: String, required: true },

    violationType: { type: String, required: true },

    status: { type: String, required: true },

    date: { type: String, required: true },

    time: { type: String, required: true },

    location: { type: String, required: true },

    videoUrl: { type: String, required: true }
})

module.exports = mongoose.model('Violation', violationSchema)