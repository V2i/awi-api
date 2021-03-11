const mongoose = require('mongoose');

const reservedSpaceSchema = new mongoose.Schema({

    reservedSpace: {
        type: mongoose.ObjectId,
        ref: "Space",
        required: true,
    },

    reservedSpaceNbTable: {
        type: Number,
        required: true,
    },

    reservedSpaceSurface: {
        type: Number,
        required: false,
    },

});

module.exports = mongoose.model('ReservedSpace', reservedSpaceSchema);

