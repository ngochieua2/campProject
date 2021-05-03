module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        // req.path  = /new
        // req.originalUrl = /campgrounds/new
        req.session.currentUrl = req.originalUrl;
        req.flash('error', 'you must be signed in first');
        return res.redirect('/login');
    }
    next();
}