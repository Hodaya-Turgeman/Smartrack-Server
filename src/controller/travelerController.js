const express = require('express');
const router = express.Router();
const Traveler = require('../model/traveler');
const Trip = require('../model/Trip');
const TravelerPlaces = require('../model/TravelerPlaces');
const { ObjectId } = require('mongodb');

const Place = require('../model/Place');
const { response } = require('express');

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
        tripId:req.query.tripId,
        travelerMail:req.query.travelerMail,
        tripDestination: req.query.tripDestination,
        tripName: req.query.tripName,
        tripDaysNumber:req.query.tripDaysNumber,
        tripDate:req.query.tripDate
    })
    console.log(trip)
    trip.save()
        .then(response=>{
            res.send('true')
        })
        .catch(error => {
                res.send( 'false')
        })
   
}
const getTripUser = (req,res)=>{
    console.log("body", req.body)
    console.log("query", req.query)
    var arrayPlace = [];
    Trip.find({travelerMail:req.query.travelerMail})
    .then(response=>{
        TravelerPlaces.find({travelerMail:req.query.travelerMail})
        .then(resTravelerPlaces=>{
            for (const travelerPlace in resTravelerPlaces) {
                if(!arrayPlace.includes(resTravelerPlaces[travelerPlace]['placeId'])){
                    arrayPlace.push(resTravelerPlaces[travelerPlace]['placeId'])
                }
            }
            Place.find({placeId:arrayPlace})
            .then(resPlaces=>{
                var  arrPlaceUser = [];
                for (const travelerPlace in resTravelerPlaces) {
                    var element = {}
                    for(const placeInfo in resPlaces){
                        if(resPlaces[placeInfo]['placeId']== resTravelerPlaces[travelerPlace]['placeId']){
                            element.placeId=resPlaces[placeInfo]['placeId']
                            element.placeName=resPlaces[placeInfo]['placeName']
                            element.placeLocationLat= resPlaces[placeInfo]['placeLocationLat']
                            element.placeLocationLng = resPlaces[placeInfo]['placeLocationLng']
                            element.placeFormattedAddress = resPlaces[placeInfo]['placeFormattedAddress']
                            element.placeInternationalPhoneNumber =  resPlaces[placeInfo]['placeInternationalPhoneNumber']
                            element.placeRating =  resPlaces[placeInfo]['placeRating']
                            element.placeWebsite = resPlaces[placeInfo]['placeWebsite']
                            element.placeImgUrl = resPlaces[placeInfo]['placeImgUrl']
                            element.placeOpeningHours = resPlaces[placeInfo]['placeOpeningHours']
                            element.placeDayInTrip = resTravelerPlaces[travelerPlace]['placeDayInTrip']
                            element.travelerMail = resTravelerPlaces[travelerPlace]['travelerMail']
                            element.tripId = resTravelerPlaces[travelerPlace]['tripId']
                            element.travelerPlaceRating = resTravelerPlaces[travelerPlace]['travelerPlaceRating']
                        
                            break
                        }
                    }
                    arrPlaceUser.push(element)
                }

                
                var item={}
                item.trips=response
                item.placeTraveler= arrPlaceUser
                
        // console.log(jsonStr)
        // res.send(jsonStr)
                // console.log(resTravelerPlaces)
                // console.log(arrPlaceUser)
                res.send(item)
            })
            .catch(err=>{
                confirm.log(err)
                res.send('false')
            })
           
        })
        .catch(error=>{
            confirm.log(error)
            res.send('false')
        })
       
    })
    .catch(error=>{
        confirm.log(error)
        res.send('false')
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
      
        const place= new Place({
            placeId: req.query.placeId,
            placeName: req.query.placeName,
            placeFormattedAddress:req.query.placeFormattedAddress,
            placeInternationalPhoneNumber:req.query.placeInternationalPhoneNumber,
            placeLocationLat:req.query.placeLocationLat,
            placeLocationLng:req.query.placeLocationLng,
            placeRating:req.query.placeRating,
            placeWebsite:req.query.placeWebsite,
            placeImgUrl:req.query.placeImgUrl,
            placeOpeningHours:req.query.placeOpeningHours
        })
        place.save()
            .then(response=>{
                res.send('true')
            })
            .catch(error =>{
                res.send( 'Exiting place in database')
            })
        
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
const editTravelerPlace = (req,res)=>{
    console.log("query", req.query)
    
    TravelerPlaces.findOneAndUpdate({travelerMail:req.query.travelerMail,tripId:req.query.tripId,placeId:req.query.placeId},{travelerPlaceRating: req.query.travelerPlaceRating},{new: true })
    .then(response=>{
        res.send('true')
    })
    .catch(error=>{
        res.send("false")
    })
}
module.exports = {infoTraveler,addTraveler,getInfoTraveler,editTraveler,addTrip,addPlace,getTripUser,editTravelerPlace}