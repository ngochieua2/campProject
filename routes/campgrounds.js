const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/errorHandler/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../utilities/middleware');
const campgroundsController = require('../controllers/campgrounds');

router.get('/', catchAsync(campgroundsController.index));

router.get('/new', isLoggedIn, campgroundsController.createPage);

router.post('/', isLoggedIn, validateCampground, catchAsync(campgroundsController.create));

router.get('/:id', catchAsync(campgroundsController.showPage));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundsController.editPage));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundsController.edit));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgroundsController.delete));

module.exports = router;