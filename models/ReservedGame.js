const mongoose = require('mongoose');
const Game = require('Game');
const Zone = require('Zone');

// Model about a game reservation from an exhibitor
const reservedGameSchema = mongoose.Schema({

    _reservedGameId: {
        type: mongoose.ObjectId,
        required: true,
    },

    reservedGame: {
        type: Game,
        required: true,
    },

    reservedGameZone: {
        type: Zone,
        required: false,
    },

    reservedGameAP: {
        type: Boolean,
        required: false,
        default: false,
    },

    isPlaced: {
        type: Boolean,
        required: false,
        default: false,
    },

    isReceived: {
        type: Boolean,
        required: false,
        default: false,
    },

    hasAnimator: {
        type: Boolean,
        required: false,
        default: false,
    },

    reservedGameQuantity: {
        type: Number,
        required: true,
    },

});

module.exports = mongoose.model('ReservedGame', reservedGameSchema);
