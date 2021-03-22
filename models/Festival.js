const mongoose = require('mongoose');
const moment = require('moment');

const festivalSchema = new mongoose.Schema({

    festivalName: {
        type: String,
        required: [ true, "Le nom du festival est obligatoire" ]
    },

    festivalDate: {
        type: Date,
        required: [ true, "La date du festival est obligatoire" ]
    },

    festivalSpace: {
        type: [{ type: mongoose.ObjectId, ref: 'Space'}],
        required: false,
    },

    isCurrent: {
        type: Boolean,
        required: true,
        default: false
    },

});

festivalSchema.pre('updateOne', function(next) {
    const docToUpdate = this.getUpdate()['$set'];
    
    if (docToUpdate.festivalDate){
        docToUpdate.festivalDate = moment(docToUpdate.festivalDate);
    }
    
    next();
  });

module.exports = mongoose.model('Festival', festivalSchema);

