const mongoose = require('mongoose');
const Editor = require('Editor');

const exhibitorSchema = mongoose.Schema({

    exhibitorId: {
        type: mongoose.ObjectId,
        required: true,
    },

    exhibitorEditor: {
        type: Editor,
        required: false,
    },

    exhibitorLastname: {
        type: String,
        required: true,
    },

    exhibitorFirstname: {
        type: String,
        required: true,
    },

    exhibitorPhone: {
        type: Number,
        required: false,
    },

    exhibitorMail: {
        type: String,
        required: false,
    },

    exhibitorNbVolunteer: {
        type: Number,
        required: true,
        default: 0,
    },

    exhibitorIsMoving: {
        type: Boolean,
        required: true,
    }

});

module.exports = mongoose.model('Exhibitor', exhibitorSchema);
