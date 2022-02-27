const mongoose = require('mongoose');
const TravelerPlaces = mongoose.model('TravelerPlaces', new mongoose.Schema({
    placeID:
        {
            type: String,
            required:true
        },
    travelerMail:{
        type:String,
        required:true
    },
    tripID:
    {
        type: mongoose.Types.ObjectId,
        ref: 'Trip'
    },
    placeDayInTrip:{
        type:Number,
        required:true
    },
    travelerPlaceRating:{
        type:Number
    },
    tripDestination:{
        type:String,
        required:true
    }

}));
module.exports = TravelerPlaces
