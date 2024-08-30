const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    votedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pollId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll',
        required: true,
    },
    optionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Vote',VoteSchema);