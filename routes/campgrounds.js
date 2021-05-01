const express = require('express');
const router = express.Router();
const catchAsync = require('../errorHandler/catchAsync');
const expressError = require('../errorHandler/expressError');
const Campground = require('../models/campground');
//const Review = require('../models/review');
const { campgroundSchema } = require('../joiSchema');

// use joi and and middleware to avoid wrong request from postman or something
const validateCampground = ((req, res, next) =>{
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError (msg, 400);
    }
    else next();
})

router.get('/', catchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}))

router.get('/new', (req, res) => {
    res.render('campgrounds/new');
})

router.post('/', validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    //console.log(req.body); // note: {campground: {title: "", location: ""}} because form uses campground[title] and campground[location]
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.get('/:id', catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', {campground});
}))

router.get('/:id/edit', catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
}))

router.put('/:id', validateCampground, catchAsync(async (req, res, next) => {
    const { id } = req.params
    //console.log(req.params);
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

module.exports = router;