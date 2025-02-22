const { postSchema, commentSchema } = require('./schemas')
const ExpressError = require('./utils/ExpressError');
const Post = require('./models/posts')
const Comment = require('./models/comments')

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be logged in')
        return res.redirect('/login')
    }
    next()
}

module.exports.validatePost = (req, res, next) => {
    const { error } = postSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params
    const post = await Post.findById(id) 
    if(!post.author.equals(req.user._id)){
        req.flash('error', `You don't have permission to do this`)
        return res.redirect(`/posts/${id}`)
    }
    next()
}

module.exports.isCommentAuthor = async(req, res, next) => {
    const {commentId} = req.params
    const comment = await Comment.findById(commentId)
    if(!comment.author.equals(req.user._id)){
        req.flash('error', `You don't have permission to do this`)
        return res.redirect(`/posts/${commentId}`)
    }
    next()
}

module.exports.validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}