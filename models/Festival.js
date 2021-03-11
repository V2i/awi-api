const mongoose = require('mongoose');
const Space = require('Space');

const festivalSchema = mongoose.Schema({

    _festivalId: {
        type: mongoose.ObjectId,
        required: true,
    },

    festivalName: {
        type: String,
        required: false,
    },

    festivalDate: {
        type: Date,
        required: true,
    },

    festivalSpace: {
        type: [Space],
        required: false,
    }

});

module.exports = mongoose.model('Festival', festivalSchema);

