const mongoose = require('mongoose');
const ReservedSpace = require('ReservedSpace');
const Billing = require('Billing');
const Tracking = require('Tracking');
const ReservedGame = require('ReservedGame');

const reservationSchema = mongoose.Schema({

    _reservationId: {
        type: mongoose.ObjectId,
        required: true,
    },

    reservationExhibitor: {
        type: mongoose.ObjectId,
        ref: 'Exhibitor',
        required: true,
    },

    reservationReservedSpace: {
        type: [ReservedSpace],
        required: true,
    },

    reservationFestival: {
        type: mongoose.ObjectId,
        ref: 'Festival',
        required: true,
    },

    reservationTracking: {
        type: Tracking,
        required: true,
    },

    reservationComment: {
        type: String,
        required: false,
    },

    reservationGame: {
        type: [ReservedGame],
        required: false,
    },

    reservationBilling: {
        type: Billing,
        required: true,
    },

    exhibitorVolunteerNeeded: {
        type: Boolean,
        required: true,
        default: false,
    },

    exhibitorIsMoving: {
        type: Boolean,
        required: true,
        default: false,
    },

});

module.exports = mongoose.model('Reservation', reservationSchema);

