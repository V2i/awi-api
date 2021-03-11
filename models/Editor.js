const mongoose = require('mongoose');

const editorSchema = mongoose.Schema({

    _editorId: {
        type: mongoose.ObjectId,
        required: true,
    },

    editorName: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Editor', editorSchema);
