const mongoose = require('mongoose');
const Place = mongoose.model('Place', new mongoose.Schema({
    plaseId:{
        type:String,
        required:true,
        unique: true
    },
    placeName:{
        type:String
    },
    placeFormattedAddress:{
        type:String
    },
    placeInternationalPhoneNumber:{
        type:String
    },
    placeLocationLat:{
        type:Number
    },
    placeLocationLng:{
        type:Number
    },
    placeRating:{
        type:Number
    },
    placeWebsite:{
        type:String
    },
    placeImgUrl:{
        type:String
    },
    placeOpeningHours:[{
        type:String
    }]

}));
module.exports = Place
