const User = require('../models/user');

module.exports.registerPage = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try{
        const { email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success',"Welcome to my website. Let's enjoy it!!!");
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.loginPage = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Login successfully');
    const redirectUrl = req.session.currentUrl || '/campgrounds';
    delete req.session.currentUrl; // think about it
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'logout successfully');
    res.redirect('/campgrounds');
}