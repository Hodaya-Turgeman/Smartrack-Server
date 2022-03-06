const mongoose = require('mongoose');
const TravelerPlaces = mongoose.model('TravelerPlaces', new mongoose.Schema({
    placeId:
        {
            type: String,
            required:true
    },
    travelerMail:{
        type:String,
        required:true
    },
    tripId:
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
