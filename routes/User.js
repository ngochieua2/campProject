const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utilities/errorHandler/catchAsync');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', catchAsync(async (req, res, next) => {
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
    
}))

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', 
    passport.authenticate('local', {  failureFlash: true, failureRedirect: '/login' }),
    (req, res) => {
        req.flash('success', 'Login successfully');
        const redirectUrl = req.session.currentUrl || '/campgrounds';
        delete req.session.currentUrl; // think about it
        res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'logout successfully');
    res.redirect('/campgrounds');
})

module.exports = router;