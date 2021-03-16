const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({

    gameName: {
        type: String,
        required: [ true, "Le nom du jeu est obligatoire" ]
    },

    gameMinimumAge: {
        type: Number,
        required: [ true, "L'âge minimum du jeu est obligatoire" ],
        default: 0,
        min: 0
    },

    gameDuration: {
        type: Number,
        required: false,
        min: 0
    },

    isPrototype: {
        type: Boolean,
        required: false,
        default: false,
    },

    gameMinimumPlayers: {
        type: Number,
        required: [ true, "Le nombre minimum de joueurs est obligatoire" ],
        default: 1,
        min: 1
    },

    gameMaximumPlayers: {
        type: Number,
        required: [ true, "Le nombre maximum de joueurs est obligatoire" ],
        default: 1,
        min: 1
    },

    gameType: {
        type: mongoose.ObjectId,
        ref: 'GameType',
        required: [ true, "Le type de jeu est obligatoire" ],
    },

    gameEditor: {
        type: mongoose.ObjectId,
        ref: 'Editor',
        required: [ true, "L'éditeur du jeu est obligatoire" ],
    },

    gameNotice: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Game', gameSchema);
