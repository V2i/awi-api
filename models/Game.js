const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({

    gameId: {
        type: mongoose.ObjectId,
        required: true,
    },

    gameName: {
        type: String,
        required: true,
    },

    gameMinimumAge: {
        type: Number,
        required: true,
        default: 0,
    },

    gameMinimumPlayers: {
        type: Number,
        required: true,
        default: 1,
    },

    gameMaximumPlayers: {
        type: Number,
        required: true,
        default: 1,
    },

    gameType: {
        //enum
        type: String,
        required: true,
    },

    gameEditor: {
        type: mongoose.ObjectId,
        ref: 'Editor',
        required: true,
    }
});

module.exports = mongoose.model('Game', gameSchema);
