const mongoose = require('mongoose');

const zoneSchema = mongoose.Schema({

    zoneId: {
        type: mongoose.ObjectId,
        required: true,
    },

    zoneName: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Zone', zoneSchema);

