const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({

    reservationExhibitor: {
        type: mongoose.ObjectId,
        ref: 'Exhibitor',
        required: true,
    },

    reservationReservedSpace: {
        type: [{ type: mongoose.ObjectId, ref: 'ReservedSpace'}],
        required: true,
    },

    reservationFestival: {
        type: mongoose.ObjectId,
        ref: 'Festival',
        required: true,
    },

    reservationTracking: {
        type: mongoose.ObjectId,
        ref: 'Tracking',
        required: true,
    },

    reservationComment: {
        type: String,
        required: false,
    },

    reservationReservedGame: {
        type: [{type : mongoose.ObjectId, ref: 'ReservedGame'} ],
        required: false,
    },

    reservationBilling: {
        type: mongoose.ObjectId,
        ref: 'Billing',
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

