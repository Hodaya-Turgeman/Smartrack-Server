const express = require('express');
const router = express.Router();
const Traveler = require('../model/traveler');
const infoTraveler = (req, res) => {
    Traveler.findOne({travelerMaill: req.params.email}).then(traveterr=> {
        res.send("True")
    }).catch(err=> {
        res.send("False")
    })

}

module.exports = {infoTraveler}