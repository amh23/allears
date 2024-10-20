const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    answeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    CreatedAt : {
        type: Date,
        required: true,
        default: Date.now,
    },
    UpdatedAt: {
        type: Date,
    },
    DeletedAt: {
        type: Date,
    },
});

const QuestionSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    askedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
        maxlength: 500,
    },
    Anwser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
    },
    CreatedAt : {
        type: Date,
        required: true,
        default: Date.now,
    },
    UpdatedAt: {
        type: Date,
    },
    DeletedAt: {
        type: Date,
    },
});

module.exports = mongoose.model('Question', QuestionSchema);