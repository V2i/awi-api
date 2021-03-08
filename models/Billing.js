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
        type : Number,
        required : true,
    },

});

module.exports = mongoose.model('Billing', billingSchema);

