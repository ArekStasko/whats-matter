const express = require('express')
const router = express.Router()
const posts = require('../controllers/posts')
const Post = require('../models/posts')
const catchAsync = require('../utils/catchAsync')
const { validatePost, isLoggedIn, isAuthor } = require('../middleware')


router.route('/')
   .get(catchAsync(posts.index))
   .post( isLoggedIn, validatePost ,catchAsync(posts.createPost))

router.route('/new')
   .get( isLoggedIn, catchAsync(posts.new))  

router.route('/:id')
   .get(catchAsync(posts.showPost))
   .delete( isLoggedIn, isAuthor, catchAsync(posts.deletePost))
   .put( isLoggedIn, isAuthor, validatePost ,catchAsync(posts.updatePost))

router.get('/:id/update', isLoggedIn, isAuthor, catchAsync(posts.renderUpdate))

module.exports = router