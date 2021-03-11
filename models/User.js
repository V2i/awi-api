const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    userMail: {
        type: String,
        required: true,
    },

    userPassword: {
        type : String,
        required : true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

});

module.exports = mongoose.model('User', userSchema);

