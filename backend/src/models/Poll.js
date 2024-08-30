const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 500,
    },
    votes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    CreatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    UpdatedAt: {
        type: Date,
        required: true,
    }
});


const PollSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    title: {
        type: String,
        required: true,
        CreatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    options: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
        required: true,

    },
    CreatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    UpdatedAt: {
        type: Date,
    }
});

module.exports = mongoose.model('Poll', PollSchema);