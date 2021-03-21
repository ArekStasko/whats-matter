const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const User = require('../models/users')
const users = require('../controllers/users')

router.route('/register')
     .get(catchAsync(users.register))
     .post(catchAsync(users.registerPost))

router.route('/login')
     .get(catchAsync(users.login))
     .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), catchAsync(users.loginPost))

router.route('/logout')
     .get(catchAsync(users.logout))
     

module.exports = router
