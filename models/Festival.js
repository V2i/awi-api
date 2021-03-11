const mongoose = require('mongoose');
const Space = require('./Space').modelName;

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

