const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({

    locationId: {
        type: mongoose.ObjectId,
        required: true,
    },

    locationZone: {
        type: mongoose.ObjectId,
        ref: "Zone",
        required: true,
    },

    locationNbTable: {
        type: Number,
        required: true,
    },

    locationSurface: {
        type: Number,
        required: false,
    }

});

module.exports = mongoose.model('Location', locationSchema);

