const express = require('express');
const router = express.Router();
const Traveler = require('../model/traveler');

const infoTraveler = (req, res) => {
    Traveler.findOne({travelerMaill: req.params.email}).then(traveler=> {
        res.send("True")
    }).catch(err=> {
        res.send("False")
    })
    
}
const getInfoTraveler = (req, res) => {
    Traveler.findOne({travelerMaill: req.params.email}).then(traveler=> {
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
        travelerMail:req.query.email,
        travelerName:req.query.name,
        travelerBirthYear:req.query.birthyear,
        travelerGender:req.query.gender,
        travelerFavoriteCategories:req.query.favorite
        // travelerMail:"hodayasi123@gmail.com",
        // travelerName:"Hodaya",
        // travelerBirthYear:1999,
        // travelerGender:"Female",
        // travelerFavoriteCategories:["amusement_park","aquarium","museum"]
    
    })
    traveler.save()
        .then(response=>{
            res.send('User added successfully')
        })
        .catch(error => {
                res.send( 'An error User Occurred!')
        })
}
module.exports = {infoTraveler,addTraveler,getInfoTraveler}