const mongoose = require('mongoose');
const Place = mongoose.model('Place', new mongoose.Schema({
    placeName:{
        type:String,
        required:true
    },
    placeFormattedAddress:{
        type:String,
        required:true
    },
    placeInternationalPhoneNumber:{
        type:String,
        required:true
    },
    placeLocationLat:{
        type:Number
    },
    placeLocationLng:{
        type:Number
    },
    attractionRating:{
        type:Number
    },
    placeWebsite:{
        type:String,
        required:true
    },
    placeImgUrl:{
        type:String,
        required:true
    },
    placeOpeningHours:[{
        type:String
    }]

}));
module.exports = Place
