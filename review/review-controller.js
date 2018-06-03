const reviewModel = require('./review-model');


//post new review
exports.postNewReview = (req, res) => {
	let newReview = new reviewModel();
	// newReview.userID = req.body.userID;
	// newReview.mapID = req.body.mapID;
	newReview.submitted = req.body.submitted;
	newReview.visitDate = req.body.visitDate;
	newReview.duration = req.body.duration;
	newReview.rating = req.body.rating;
	newReview.safety = req.body.safety;
	newReview.hospitality = req.body.hospitality;
  newReview.dress = req.body.dress;
  newReview.affordability = req.body.affordability;
  newReview.access = req.body.access;
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
		reviewModel.find({userID: req.user.id})
	.then((reviews) => {
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
