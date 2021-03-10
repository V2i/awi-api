const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    userId: {
        type: mongoose.ObjectId,
        required: true,
    },

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

