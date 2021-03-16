const mongoose = require('mongoose');

const reservedSpaceSchema = new mongoose.Schema({

    reservedSpace: {
        type: mongoose.ObjectId,
        ref: "Space",
        required: true,
    },

    reservedSpaceNbTable: {
        type: Number,
        required: false,
        min:0
    },

    reservedSpaceSurface: {
        type: Number,
        required: false,
        min:0
    },

    reservedSpaceDiscount: {
        type: Number,
        required: false,
        min:0
    },

});

module.exports = mongoose.model('ReservedSpace', reservedSpaceSchema);

