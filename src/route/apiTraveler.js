const router = require('express').Router();
const traveler = require('../controller/travelerController');

router.get('/iftravelerindb/:email',traveler.infoTraveler)
router.get('/addtraveler',traveler.addTraveler )
router.get('/getinfotraveler',traveler.getInfoTraveler)
router.get('/editTraveler',traveler.editTraveler)
router.get('/addTrip',traveler.addTrip)
module.exports = router;