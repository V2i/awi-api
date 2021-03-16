const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({

    trackingWorkflow: {
        type: String,
        required: true,
        enum: ['Pas encore contacté', 'Contacté', 'Discussion en cours', 'Réservation confirmée', 'Jeux demandés', 'Jeux confirmés'],
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

