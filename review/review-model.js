const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    // userID: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    // mapID: {type: mongoose.Schema.Types.ObjectId, ref: 'map'},
    submitted: { type: Date, default: Date.now },
    visit: {type: String, required: true},
    duration: {type: String, required: true},
    rating: {type: String, required: true},
    safety: {type: String, required: true},
    dress: {type: String, required: true},
    affordability: {type: String, required: true},
    title: {type: String, required: true},
    summary: {type: String, required: true},
});



module.exports = mongoose.model('review', reviewSchema);
