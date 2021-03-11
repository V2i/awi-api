const mongoose = require('mongoose');

const reservedSpaceSchema = mongoose.Schema({

    _reservedSpaceId: {
        type: mongoose.ObjectId,
        required: true,
    },

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

