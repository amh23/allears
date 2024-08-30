const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 250,
    },
    code: {
        type: Number,
        required: true,
    },
    descrption: {
        type: String,
        maxlength: 500,
    },
    started_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Event', EventSchema);