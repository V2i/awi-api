const mongoose = require('mongoose');

const gameTypeSchema = new mongoose.Schema({

    gameTypeName: {
        type: String,
        required: [ true, "Le type de jeu est obligatoire" ],
    }

});

module.exports = mongoose.model('GameType', gameTypeSchema);
