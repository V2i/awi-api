const mongoose = require('mongoose');
const moment = require('moment');

const billingSchema = new mongoose.Schema({

    billingStatus: {
        type: String,
        required: true,
        default: 'Pas faite'     
    },

    billingAmount: {
        type: Number,
        required: true,
        default: 0
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

