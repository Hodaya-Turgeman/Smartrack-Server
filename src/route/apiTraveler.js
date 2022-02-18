const router = require('express').Router();
const traveler = require('../controller/travelerController');

router.get('/iftravelerindb/:email',traveler.infoTraveler)
router.get('/addUser',traveler.addUser )
router.get('/getinfotraveler/:email',traveler.getInfoTraveler)
module.exports = router;