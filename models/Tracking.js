const mongoose = require('mongoose');
const moment = require('moment');
const enumTrackingWorkflow = ['Pas encore contacté', 'Contacté', 'Discussion en cours', 'Réservation confirmée', 'Jeux demandés', 'Jeux confirmés'];
const trackingSchema = new mongoose.Schema({

    //todo: enum not working
    trackingWorkflow: {
        type: String,
        required: true,
        enum: enumTrackingWorkflow,
    },

    trackingContact1: {
        type: Date,
        required: false,
    },

    trackingContact2: {
        type: Date,
        required: false,
    },

    // TODO: ask question????
    trackingCR: {
        type: Boolean,
        required: false,
    },

});

trackingSchema.pre('updateOne', function(next) {
    const docToUpdate = this.getUpdate()['$set'];
    if (docToUpdate.trackingWorkflow){
        if (!enumTrackingWorkflow.includes(docToUpdate.trackingWorkflow)){
            throw new Error("trackingWorkflow not valid");
        }
    }
    if (docToUpdate.trackingContact1){
        docToUpdate.trackingContact1 = moment(docToUpdate.trackingContact1);
    }
    if (docToUpdate.trackingContact2){
        docToUpdate.trackingContact2 = moment(docToUpdate.trackingContact2);
    }
    next();
  });

module.exports = mongoose.model('Tracking', trackingSchema);

