const express = require('express');
const router = express.Router();
const Traveler = require('../model/traveler');
const Trip = require('../model/Trip');
const TravelerPlaces = require('../model/TravelerPlaces');

const infoTraveler = (req, res) => {
    Traveler.findOne({travelerMail: req.params.email}).then(traveler=> {
        res.send("True")
    }).catch(err=> {
        res.send("False")
    })
    
}
const addTrip = (req,res) =>{
    console.log("body", req.body)
    console.log("params", req.params)
    console.log("query", req.query)
    res.send(req.query)

    const trip = new Trip({ 
        travelerMail:req.query.travelerMail,
        tripDestination: req.query.tripDestination,
        tripName: req.query.tripName,
        tripDaysNumber:req.query.tripDaysNumber
    })
    trip.save()
    .then(response=>{
//             const travelerPlaces = new  TravelerPlaces({
//                 placeID:req.query.placeID,
//                 travelerMail:req.query.travelerMail,
//                 tripID: response._id,
//                 placeDayInTrip :req.query.placeDayInTrip,
//                 travelerPlaceRating: 0,
//                 tripDestination:req.query.tripDestination

//             })
//             travelerPlaces.save()
//             .then(response=>{
//                 const mergedObj = Object.assign(trip,travelerPlaces);
//                 const jsonStr = JSON.stringify(mergedObj);
//                 console.log(jsonStr)
//                 // res.send(jsonStr)
//                 res.send('true')
//             })
//             .catch(error =>{
//                 res.send( 'An error add travelerPlaces !')
//             })
    res.send( response._id)
        })
    .catch(error => {
            res.send( 'false')
    })

}
const addPlace = (req,res) =>{
    console.log("body", req.body)
    console.log("params", req.params)
    console.log("query", req.query)
    res.send(req.query)
    const travelerPlaces = new  TravelerPlaces({
        placeID:req.query.placeID,
        travelerMail:req.query.travelerMail,
        tripID: req.query.tripId,
        placeDayInTrip :req.query.placeDayInTrip,
        travelerPlaceRating: 0,
        tripDestination:req.query.tripDestination
    })
    travelerPlaces.save()
    .then(response=>{
        // const mergedObj = Object.assign(trip,travelerPlaces);
        // const jsonStr = JSON.stringify(mergedObj);
        // console.log(jsonStr)
        // res.send(jsonStr)
        res.send('true')
    })
    .catch(error =>{
        res.send( 'An error add travelerPlaces !')
    })
}
const getInfoTraveler = (req, res) => {
    Traveler.findOne({travelerMail: req.query.travelerMail}).then(traveler=> {
        const x= typeof traveler
        console.log(x)


        // const mergedObj = Object.assign(traveler,traveler);
        // const jsonStr = JSON.stringify(mergedObj);
        // console.log(jsonStr)
        // res.send(jsonStr)
        res.send(traveler)
    }).catch(err=> {
        res.send("False")
    })
}
const addTraveler= (req,res)=>{
    console.log("body", req.body)
    console.log("params", req.params)
    console.log("query", req.query)
    const traveler=new Traveler({
        travelerMail:req.query.travelerMail,
        travelerName:req.query.travelerName,
        travelerBirthYear:req.query.travelerBirthYear,
        travelerGender:req.query.travelerGender,
        travelerFavoriteCategories:req.query.travelerFavoriteCategories
    })
    console.log("traveler", traveler)
    traveler.save()
        .then(response=>{
            res.send('true')
        })
        .catch(error => {
                res.send( 'An error User Occurred!')
        })
}
const editTraveler = (req,res)=>{
    console.log("query", req.query)
    const traveler={
        travelerMail:req.query.travelerMail,
        travelerName:req.query.travelerName,
        travelerBirthYear:req.query.travelerBirthYear,
        travelerGender:req.query.travelerGender,
        travelerFavoriteCategories:req.query.travelerFavoriteCategories
    }
    console.log("traveler", traveler)
    Traveler.findOneAndUpdate({travelerMail:req.query.travelerMail},traveler, {new: true })
        .then(response=>{
            res.send('true')
        })
        .catch(error=>{
            res.send("false")
        })
}
module.exports = {infoTraveler,addTraveler,getInfoTraveler,editTraveler,addTrip,addPlace}