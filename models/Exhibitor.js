const mongoose = require('mongoose');
const Editor = require('Editor');
const Contact = require('Contact');

// model about people show casing game to festival
const exhibitorSchema = new mongoose.Schema({

    exhibitorEditor: {
        type: Editor,
        required: false,
    },

    exhibitorName: {
        type: String,
        required: true,
    },

    exhibitorContact: {
        type: [Contact],
        required: true,
    },

});

module.exports = mongoose.model('Exhibitor', exhibitorSchema);
