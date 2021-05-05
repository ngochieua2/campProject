const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}

module.exports.createPage = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.create = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    //console.log(req.body); // note: {campground: {title: "", location: ""}} because form uses campground[title] and campground[location]
    // check req.file to check it empty or not
    campground.images = req.files.map(file => ({url: file.path, filename: file.filename}));
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully created a new campground');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showPage = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id)
        .populate({path:'reviews', populate: { path: 'author' }}) // review
        .populate('author'); // author of campground // user
    if (!campground) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
}

module.exports.editPage = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground});
}

module.exports.edit = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    const imgs = req.files.map(file => ({url: file.path, filename: file.filename}));
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    }
    req.flash('success', 'Successfully updated that campground');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.delete = async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully delete campground');
    res.redirect('/campgrounds');
}