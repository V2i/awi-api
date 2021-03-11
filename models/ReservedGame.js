const mongoose = require('mongoose');

const Game = require('../models/Game').schema;
const Zone = require('../models/Zone').schema;

// Model about a game reservation from an exhibitor
const reservedGameSchema = new mongoose.Schema({

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
