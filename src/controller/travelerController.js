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
    const trip = new Trip({ 
        travelerMail:req.query.travelerMail,
        tripDestination: req.query.tripDestination,
        tripName: req.query.tripName,
        tripDaysNumber:req.query.tripDaysNumber
    })
    console.log(trip)
    trip.save().then(response=>{
        res.send( response)
    })
    .catch(error => {
            res.send( 'false')
    })

}
const addPlace = (req,res) =>{
    console.log("body", req.body)
    console.log("params", req.params)
    console.log("query", req.query)
    const travelerPlaces = new  TravelerPlaces({
        placeId:req.query.placeId,
        travelerMail:req.query.travelerMail,
        tripId: req.query.tripId,
        placeDayInTrip :req.query.placeDayInTrip,
        travelerPlaceRating: 0,
        tripDestination:req.query.tripDestination
    })
    travelerPlaces.save().then(response=>{
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