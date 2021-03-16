const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    contactLastname: {
        type: String,
        required: true,
    },

    contactFirstname: {
        type: String,
        required: true,
    },

    contactPhone: {
        type: Number,
        required: false,
    },

    contactMobilePhone: {
        type: Number,
        required: false,
    },

    contactMail: {
        type: String,
        required: true,
    },

    contactFunction: {
        type: String,
        required: true,
    },

    contactMain: {
        type: Boolean,
        required: true,
    },

});

module.exports = mongoose.model('Contact', contactSchema);
