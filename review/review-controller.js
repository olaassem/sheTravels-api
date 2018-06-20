const reviewModel = require('./review-model');
const mongoose = require('mongoose');

//post new review
exports.postNewReview = (req, res) => {
	let newReview = new reviewModel();
	newReview.userID = mongoose.Types.ObjectId(req.body.userID);
	newReview.submitted = req.body.submitted;
	newReview.address = req.body.address;
	newReview.country = req.body.country;
	newReview.age = req.body.age;
	newReview.name = req.body.name;
	newReview.formattedAddress = req.body.formattedAddress;
	newReview.picture = req.body.picture;
	newReview.visit = req.body.visit;
	newReview.duration = req.body.duration;
	newReview.rating = req.body.rating;
	newReview.safety = req.body.safety;
  newReview.dress = req.body.dress;
  newReview.affordability = req.body.affordability;
  newReview.title = req.body.title;
  newReview.summary = req.body.summary;
	newReview.save()
	.then((review) => {
		res.status(200).json({
			message: `New review (${newReview.title}) saved.`,
			data: review
		})
	})
	.catch((error) => {
		res.status(500).json({
			message: `Error saving new review (${newReview.title}).`,
			data: error
		})
	})
}

//Get all sheTravels users' reviews
exports.getAllAppReviews = (req, res) => {
		reviewModel.find()
	.then((reviews) => {
		console.log(reviews);
		res.status(200).json({
			message: "Successfully retrieved all reviews.",
			data: reviews
		})
	})
	.catch((error) => {
		res.status(500).json({
			message: "Error retrieving all reviews.",
			data: error
		})
	})
}


//Get all reviews for unique user
exports.getAllUserReviews = (req, res) => {
	console.log(`userID:   ` + req.user.id);
		reviewModel.find({userID: req.user.id})
	.then((reviews) => {
		console.log(`reviews:  ` + reviews);
		res.status(200).json({
			message: "Successfully retrieved all user reviews.",
			data: reviews
		})
	})
	.catch((error) => {
		res.status(500).json({
			message: "Error retrieving all user reviews.",
			data: error
		})
	})
}


//Delete review by ID
exports.deleteReviewByID = (req,res) => {
	reviewModel.findByIdAndRemove(req.params.id)
	.then(() => {
  		res.status(200).json({
  			message: `Successfully deleted review with ID ${req.params.id}.`
  		})
	})
	.catch((error) => {
  		res.status(500).json({
  			message: `Error deleting review with ID ${req.params.id}.`,
  			data: error
  		})
	})
}
