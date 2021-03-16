const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({

    spaceName: {
        type: String,
        required: [ true, "Le nom de l'espace est obligatoire" ],
    },

    spacePriceTable: {
        type: Number,
        required: [ true, "Le prix des tables de l'espace est obligatoire" ],
    },

    spacePriceSurface: {
        type: Number,
        required: [ true, "Le prix au m2 de l'espace est obligatoire" ],
    },

    spaceNbTable: {
        type: Number,
        required: [ true, "Le nombre de tables de l'espace est obligatoire" ],
    },

    spaceSurface: {
        type: Number,
        required: false,
    },

});

module.exports = mongoose.model('Space', spaceSchema);

