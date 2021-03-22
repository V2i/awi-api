const mongoose = require('mongoose');
const mail = require('../validators/mail');
const tel = require('../validators/telephone');

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
        type: Number,
        required: false,
        validate: {
            validator: tel,
            message: props => `${props.value} is not a valid phone number!`
        },
    },

    contactMobilePhone: {
        type: Number,
        required: false,
        validate: {
            validator: tel,
            message: props => `${props.value} is not a valid phone number!`
        },
    },

    contactMail: {
        type: String,
        required: [ true, "L'adresse mail du contact est obligatoire" ],
        validate: {
            validator: mail,
            message: props => `${props.value} is not a valid mail!`
          },
    },

    contactFunction: {
        type: String,
        required: [ true, "La fonction du contact est obligatoire" ]
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
    if (docToUpdate.contactMobilePhone){
        if (!tel(docToUpdate.contactMobilePhone)){
            throw new Error("contactMobilePhone not valid");
        }
    }

    if (docToUpdate.contactPhone){
        if (!tel(docToUpdate.contactPhone)){
            throw new Error("contactPhone not valid");
        }
    }
    
    next();
  });

module.exports = mongoose.model('Contact', contactSchema);
