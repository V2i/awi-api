const mongoose = require('mongoose');
const Zone = require('Zone');

const festivalSchema = mongoose.Schema({

    festivalId: {
        type: mongoose.ObjectId,
        required: true,
    },

    festivalName: {
        type: String,
        required: true,
    },

    festivalZone: {
        type: [Zone],
        required: false,
    }

});

module.exports = mongoose.model('Festival', festivalSchema);

