const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    contactLastname: {
        type: String,
        required: [ true, "Le nom de famille du contact est obligatoire" ]
    },

    contactFirstname: {
        type: String,
        required: [ true, "Le prénom du contact est obligatoire" ]
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
        required: [ true, "L'adresse mail du contact est obligatoire" ]
    },

    contactFunction: {
        type: String,
        required: [ true, "La fonction du contact est obligatoire" ]
    },

    contactMain: {
        type: Boolean,
        required: true,
    },

});

module.exports = mongoose.model('Contact', contactSchema);
