const express = require('express');
const router = express.Router({mergeParams: true}); // to merge params and find id from params // line 22

const catchAsync = require('../errorHandler/catchAsync');
const expressError = require('../errorHandler/expressError');

const Campground = require('../models/campground');
const Review = require('../models/review');

const { reviewSchema } = require('../joiSchema');

const validateReview = ((req, res, next) =>{
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError (msg, 400);
    }
    else next();
})

router.post('/', validateReview, catchAsync(async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', catchAsync( async(req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: {reviews: reviewId}}); 
    // pull will remove an existing array all insances of value or value that match a specified condition
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;