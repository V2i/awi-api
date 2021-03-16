const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({

    zoneName: {
        type: String,
        required: [ true, "Le nom de la zone est obligatoire" ],
    },

});

module.exports = mongoose.model('Zone', zoneSchema);

