const mongoose = require('mongoose');

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
        type: [mongoose.ObjectId],
        ref: 'Space',
        required: false,
    },

    isCurrent: {
        type: Boolean,
        required: false,
    },

});

module.exports = mongoose.model('Festival', festivalSchema);

