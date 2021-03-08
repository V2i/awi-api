const mongoose = require('mongoose');

const zoneSchema = mongoose.Schema({

    zoneId: {
        type: mongoose.ObjectId,
        required: true,
    },

    zoneName: {
        type: String,
        required: true,
    },

    zonePrice: {
        type: Number,
        required: true,
    },

    zoneNbTable: {
        type: Number,
        required: true
    },

    zoneSurface: {
        type: Number,
        required: true,
    },

});

module.exports = mongoose.model('Zone', zoneSchema);

