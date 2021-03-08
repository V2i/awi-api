const mongoose = require('mongoose');
const Location = require('Location');
const Game = require('Game');
const Billing = require('Billing');

const reservationSchema = mongoose.Schema({

    reservationId: {
        type: mongoose.ObjectId,
        required: true,
    },

    reservationExhibitor: {
        type: mongoose.ObjectId,
        ref: 'Exhibitor',
        required: true,
    },

    reservationLocation: {
        type: [Location],
        required: true,
    },

    reservationFestival: {
        type: mongoose.ObjectId,
        ref: 'Festival',
        required: true,
    },

    reservationNote: {
        type: String,
        required: false,
    },

    reservationWorkflow: {
        //enum
        type: String,
        required: true,
    },

    reservationGame: {
        type: [Game],
        required: false,
    },

    reservationBilling: {
        type: Billing,
        required: true,
    }

});

module.exports = mongoose.model('Reservation', reservationSchema);

