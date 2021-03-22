const mongoose = require('mongoose');
const moment = require('moment');
const billingStatus = ['Faite', 'Pas faite', 'Réglée'];

const billingSchema = new mongoose.Schema({

    billingStatus: {
        type: String,
        required: true,
        enum: billingStatus,
        default: 'Pas faite'     
    },

    billingAmount: {
        type: Number,
        required: true,
        default: 0
    },

    billingSendDate: {
        type: Date,
        required: false,
    },

    billingPaidDate: {
        type: Date,
        required: false,
    },

});

billingSchema.pre('updateOne', function(next) {
    const docToUpdate = this.getUpdate()['$set'];
    if (docToUpdate.billingStatus){
        if (!billingStatus.includes(docToUpdate.trackingWorkflow)){
            throw new Error("billingStatus not valid");
        }
    }
    if (docToUpdate.billingSendDate){
        docToUpdate.billingSendDate = moment(docToUpdate.trackingContact1);
    }
    if (docToUpdate.billingPaidDate){
        docToUpdate.billingPaidDate = moment(docToUpdate.trackingContact2);
    }
    next();
  });

module.exports = mongoose.model('Billing', billingSchema);

