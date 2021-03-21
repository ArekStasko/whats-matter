const express = require('express')
const router = express.Router({ mergeParams: true })
const Post = require('../models/posts')
const Comment = require('../models/comments')
const comments = require('../controllers/comments')
const catchAsync = require('../utils/catchAsync')
const { validateComment, isLoggedIn, isCommentAuthor } = require('../middleware')


router.route('/')
    .post( isLoggedIn, validateComment, catchAsync(comments.createComment))

router.delete('/:commentId', isLoggedIn, isCommentAuthor, catchAsync(comments.deleteComment))



router.post('/:commentId/add', comments.addRate)

router.post('/:commentId/substract', comments.substractRate)



module.exports = router