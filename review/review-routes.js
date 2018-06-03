const express = require('express');
const router = express.Router();
const reviewController = require('./review-controller');
// const commonController = require('../common/common');


router.post('/new', reviewController.postNewReview);
router.get('/allreviews', reviewController.getAllAppReviews);
router.get('/all', reviewController.getAllUserReviews);
router.delete('/:id', reviewController.deleteReviewByID);



// router.post('/new/:token', commonController.verifyToken, reviewController.postNewReview);
// router.get('/allreviews', reviewController.getAllAppReviews);
// router.get('/all/:token', commonController.verifyToken, reviewController.getAllUserReviews);
// router.delete('/:id/:token', commonController.verifyToken, reviewController.deleteReviewByID);



module.exports = router;
