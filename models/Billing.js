const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({

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

