const mongoose = require('mongoose');
const Trip = mongoose.model('Trip', new mongoose.Schema({
    travelerID:{
        type: mongoose.Types.ObjectId,
        ref: 'Traveler',
        required:true,
    },
    tripDestination:{
        type:String,
        required:true
    },
    tripName:{
        type:String
    },
    tripDaysNumber:{
        type:Number,
        required:true
    }
}));


module.exports = Trip
