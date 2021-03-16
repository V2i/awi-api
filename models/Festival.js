const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({

    festivalName: {
        type: String,
        required: [ true, "Le nom du festival est obligatoire" ]
    },

    festivalDate: {
        type: Date,
        required: [ true, "La date du festival est obligatoire" ]
    },

    festivalSpace: {
        type: [{ type: mongoose.ObjectId, ref: 'Space'}],
        required: false,
    },

    isCurrent: {
        type: Boolean,
        required: true,
        default: false
    },

});

module.exports = mongoose.model('Festival', festivalSchema);

