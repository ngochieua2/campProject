const express = require('express');
const router = express.Router({mergeParams: true}); // to merge params and find id from params // line 22
const catchAsync = require('../utilities/errorHandler/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../utilities/middleware');
const reviewsController = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviewsController.create));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewsController.delete));

module.exports = router;