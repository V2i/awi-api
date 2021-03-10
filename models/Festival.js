const mongoose = require('mongoose');
const Space = require('models/Space');

const festivalSchema = mongoose.Schema({

    festivalId: {
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
        //il y en a 3
        type: [Space],
        required: false,
    }

});

module.exports = mongoose.model('Festival', festivalSchema);

