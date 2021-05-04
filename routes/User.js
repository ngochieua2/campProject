const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/errorHandler/catchAsync');
const passport = require('passport');
const usersController = require('../controllers/users');

router.route('/register')
    .get(usersController.registerPage)
    .post(catchAsync(usersController.register));

router.route('/login')
    .get(usersController.loginPage)
    .post( passport.authenticate('local', {  failureFlash: true, failureRedirect: '/login' }),
        usersController.login);

router.get('/logout', usersController.logout);

module.exports = router;