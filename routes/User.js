const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/errorHandler/catchAsync');
const passport = require('passport');
const usersController = require('../controllers/users');

router.get('/register', usersController.registerPage);

router.post('/register', catchAsync(usersController.register));

router.get('/login', usersController.loginPage);

router.post('/login', 
    passport.authenticate('local', {  failureFlash: true, failureRedirect: '/login' }),
    usersController.login);

router.get('/logout', usersController.logout);

module.exports = router;