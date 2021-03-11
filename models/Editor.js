const mongoose = require('mongoose');

const editorSchema = new mongoose.Schema({

    editorName: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Editor', editorSchema);
