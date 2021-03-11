const mongoose = require('mongoose');

const Space = require('../models/Space').schema;

const festivalSchema = new mongoose.Schema({

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

