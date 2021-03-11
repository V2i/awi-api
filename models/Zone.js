const mongoose = require('mongoose');

const zoneSchema = mongoose.Schema({

    _zoneId: {
        type: mongoose.ObjectId,
        required: true,
    },

    zoneName: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Zone', zoneSchema);

