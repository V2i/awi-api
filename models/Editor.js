const mongoose = require('mongoose');

const editorSchema = new mongoose.Schema({

    editorName: {
        type: String,
        required: [ true, "Le nom de l'éditeur est obligatoire" ]
    },

});

module.exports = mongoose.model('Editor', editorSchema);
