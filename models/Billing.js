const mongoose = require('mongoose');

const billingSchema = mongoose.Schema({

    billingId: {
        type: mongoose.ObjectId,
        required: true,
    },

    billingStatus: {
        //enum
        type: String,
        required: true,
    },

    billingAmount: {
        type: Number,
        required: true,
    },

    billingSendDate: {
        type: Date,
        required: false,
    },

    billingPaidDate: {
        type: Date,
        required: false,
    },

});

module.exports = mongoose.model('Billing', billingSchema);

