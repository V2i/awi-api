const mongoose = require('mongoose');

const gameTypeSchema = new mongoose.Schema({

    gameTypeName: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('GameType', gameTypeSchema);
