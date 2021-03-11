const mongoose = require('mongoose');

const ReservedSpace = require('../models/ReservedSpace').schema;
const Billing = require('../models/Billing').schema;
const Tracking = require('../models/Tracking').schema;
const ReservedGame = require('../models/ReservedGame').schema;

const reservationSchema = new mongoose.Schema({

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

