const mongoose = require('mongoose');
const mail = require('../validators/mail');

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

userSchema.pre('updateOne', function(next) {
    const docToUpdate = this.getUpdate()['$set'];
    if (docToUpdate.userMail){
        if (!mail(docToUpdate.userMail)){
            throw new Error("mail not valid");
        }
    }
    
    next();
  });

module.exports = mongoose.model('User', userSchema);

