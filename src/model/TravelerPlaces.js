const mongoose = require('mongoose');
const TravelerPlaces = mongoose.model('TravelerPlaces', new mongoose.Schema({
    placeID:
        {
            type: mongoose.Types.ObjectId,
            ref: 'Place'
        },
    travelerID:
        {
            type: mongoose.Types.ObjectId,
            ref: 'Traveler'
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


}));
module.exports = TravelerPlaces
