const mongoose = require('mongoose');
const Contact = require('Contact');

const editorSchema = mongoose.Schema({

    editorId: {
        type: mongoose.ObjectId,
        required: true,
    },

    editorName: {
        type: String,
        required: true,
    },

    editorAddress: {
        type: String,
        required: false,
    },

    editorContact: {
        type: [Contact],
        required: true,
    }
});

module.exports = mongoose.model('Editor', editorSchema);
