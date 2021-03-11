const mongoose = require('mongoose');

const spaceSchema = mongoose.Schema({

    _spaceId: {
        type: mongoose.ObjectId,
        required: true,
    },

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

