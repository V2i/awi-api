const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({

    spaceName: {
        type: String,
        required: true,
    },

    spacePriceTable: {
        type: Number,
        required: true,
    },

    spacePriceSurface: {
        type: Number,
        required: true,
    },

    spaceNbTable: {
        type: Number,
        required: true
    },

    spaceSurface: {
        type: Number,
        required: false,
    },

});

module.exports = mongoose.model('Space', spaceSchema);

