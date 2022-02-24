const express = require('express');
const router = express.Router();
const Traveler = require('../model/traveler');

const infoTraveler = (req, res) => {
    Traveler.findOne({travelerMail: req.params.email}).then(traveler=> {
        res.send("True")
    }).catch(err=> {
        res.send("False")
    })
    
}
const getInfoTraveler = (req, res) => {
    Traveler.findOne({travelerMail: req.query.travelerMail}).then(traveler=> {
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
module.exports = {infoTraveler,addTraveler,getInfoTraveler,editTraveler}