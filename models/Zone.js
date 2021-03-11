const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({

    zoneName: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Zone', zoneSchema);

