const mongoose = require('mongoose');
const mail = require('../validators/mail');

const contactSchema = new mongoose.Schema({

    contactLastname: {
        type: String,
        required: [ true, "Le nom de famille du contact est obligatoire" ]
    },

    contactFirstname: {
        type: String,
        required: [ true, "Le prénom du contact est obligatoire" ]
    },

    contactPhone: {
        type: String,
        required: false,
    },

    contactMobilePhone: {
        type: String,
        required: false,
    },

    contactMail: {
        type: String,
        required: false,
        validate: {
            validator: mail,
            message: props => `${props.value} is not a valid mail!`
          },
    },

    contactFunction: {
        type: String,
        required: false
    },

    contactMain: {
        type: Boolean,
        required: true,
    },

});

contactSchema.pre('updateOne', function(next) {
    const docToUpdate = this.getUpdate()['$set'];
    if (docToUpdate.contactMail){
        if (!mail(docToUpdate.contactMail)){
            throw new Error("mail not valid");
        }
    }
    
    next();
  });

module.exports = mongoose.model('Contact', contactSchema);
