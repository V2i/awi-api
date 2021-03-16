const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    userMail: {
        type: String,
        required: [ true, "Le mail de l'utilisateur est obligatoire" ],
    },

    userPassword: {
        type : String,
        required: [ true, "Le mot de passe de l'utilisateur est obligatoire" ],
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

});

module.exports = mongoose.model('User', userSchema);

