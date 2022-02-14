const router = require('express').Router();
const recommender = require('../controller/recommenderController');
const planTrip = require('../controller/planTripController');

router.get('/samesizekmeans', planTrip.sameSizeKMeans)
router.get('/recommender',recommender.recommendeCollaborativeFilterin)
module.exports = router;