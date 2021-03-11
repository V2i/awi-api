const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({

    trackingWorkflow: {
        //enum
        type: String,
        required: true,
    },

    trackingContact1: {
        type: Date,
        required: false,
    },

    trackingContact2: {
        type: Date,
        required: false,
    },

    // TODO: ask question????
    trackingCR: {
        type: Boolean,
        required: false,
    },

});

module.exports = mongoose.model('Tracking', trackingSchema);

