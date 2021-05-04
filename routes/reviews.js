const express = require('express');
const router = express.Router({mergeParams: true}); // to merge params and find id from params // line 22
const catchAsync = require('../utilities/errorHandler/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../utilities/middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Review added');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync( async(req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: {reviews: reviewId}}); 
    // pull will remove an existing array all insances of value or value that match a specified condition
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully delete review');
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;