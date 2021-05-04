const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/errorHandler/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, validateCampground, isAuthor } = require('../utilities/middleware');

router.get('/', catchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}))

router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
})

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    //console.log(req.body); // note: {campground: {title: "", location: ""}} because form uses campground[title] and campground[location]
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully created a new campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.get('/:id', catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id)
        .populate({path:'reviews', populate: { path: 'author' }}) // review
        .populate('author'); // author of campground // user
    if (!campground) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
}))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground});
}))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    //console.log(req.params);
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    req.flash('success', 'Successfully updated that campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully delete campground');
    res.redirect('/campgrounds');
}))

module.exports = router;