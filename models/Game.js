const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({

    gameName: {
        type: String,
        required: true,
    },

    gameMinimumAge: {
        type: Number,
        required: true,
        default: 0,
    },

    gameDuration: {
        type: Number,
        required: false,
    },

    isPrototype: {
        type: Boolean,
        required: false,
        default: false,
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
        type: mongoose.ObjectId,
        ref: 'GameType',
        required: true,
    },

    gameEditor: {
        type: mongoose.ObjectId,
        ref: 'Editor',
        required: true,
    },

    gameNotice: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Game', gameSchema);
