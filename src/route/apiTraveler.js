const router = require('express').Router();
const traveler = require('../controller/travelerController');

router.get('/iftravelerindb/:email',traveler.infoTraveler)
router.get('/addtraveler',traveler.addTraveler )
router.get('/getinfotraveler/:email',traveler.getInfoTraveler)
module.exports = router;