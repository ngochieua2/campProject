const expressError = require('./errorHandler/expressError');
const { campgroundSchema, reviewSchema } = require('./joiSchema');
const Campground = require('../models/campground');
const Review = require('../models/review');

// check user will login before create camp or edit it...
module.exports.isLoggedIn = ((req, res, next) => {
    if(!req.isAuthenticated()) {
        // req.path  = /new
        // req.originalUrl = /campgrounds/new
        req.session.currentUrl = req.originalUrl; // it use session instead of using res.locals because it will be delete after using while locals will be exist longer
        req.flash('error', 'you must be signed in first');
        return res.redirect('/login');
    }
    next();
})
// use joi and and middleware to avoid wrong request from postman or something
// check req will have correct format
module.exports.validateCampground = ((req, res, next) =>{
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError (msg, 400);
    }
    else next();
})

// check user is owner or not
module.exports.isAuthor = (async (req,res, next) =>{
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
})

// use joi and and middleware to avoid wrong request from postman or something
// check req will have correct format
module.exports.validateReview = ((req, res, next) =>{
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError (msg, 400);
    }
    else next();
})

// check user is review owner or not
module.exports.isReviewAuthor = (async (req,res, next) =>{
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
})
