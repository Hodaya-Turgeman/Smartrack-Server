const mongoose = require('mongoose');
const Trip = mongoose.model('Trip', new mongoose.Schema({
    travelerMail:{
        type:String,
        required:true
    },
    tripId:{
        type:String,
        required:true,
        unique: true
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
