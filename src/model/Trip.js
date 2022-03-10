const mongoose = require('mongoose');
const Trip = mongoose.model('Trip', new mongoose.Schema({
    tripId:{
        type:String,
        required:true,
        unique: true
    },
    travelerMail:{
        type:String,
        required:true
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
    },
    tripDate:{
        type:String
    }
}));


module.exports = Trip
