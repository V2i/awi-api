const mongoose = require('mongoose');

// model about people show casing game to festival
const exhibitorSchema = new mongoose.Schema({

    exhibitorEditor: {
        type: mongoose.ObjectId,
        ref: 'Editor',
        required: false,
    },

    exhibitorName: {
        type: String,
        required: [ true, "Le nom de l'exposant est obligatoire" ]
    },

    exhibitorContact: {
        type: [{type: mongoose.ObjectId, ref: 'Contact'}],
        required: false,
    },

});

module.exports = mongoose.model('Exhibitor', exhibitorSchema);
