const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/errorHandler/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../utilities/middleware');
const campgroundsController = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgroundsController.index))
    .post(isLoggedIn,  upload.array('images'), validateCampground, catchAsync(campgroundsController.create));

router.get('/new', isLoggedIn, campgroundsController.createPage);

router.route('/:id')
    .get(catchAsync(campgroundsController.showPage))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundsController.edit))
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundsController.delete));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundsController.editPage));

module.exports = router;