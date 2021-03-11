const mongoose = require('mongoose');

const Editor = require('../models/Editor').schema;
const Contact = require('../models/Contact').schema;

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
        required: false,
    },

});

module.exports = mongoose.model('Exhibitor', exhibitorSchema);
