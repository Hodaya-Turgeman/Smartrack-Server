const router = require('express').Router();
const planTrip = require('../controller/planTripController');

router.get('/samesizekmeans', planTrip.sameSizeKMeans)

module.exports = router;