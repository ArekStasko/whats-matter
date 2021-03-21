const Post = require('../models/posts')
const Comment = require('../models/comments')
const User = require('../models/users')

module.exports.createComment = async(req, res) => {
    const post = await Post.findById(req.params.id)
    const comment = new Comment(req.body.comments)
    comment.author = req.user._id;
    post.comments.push(comment)
    await comment.save()
    await post.save()
    req.flash('success', 'Thank you, for your comment :D');
    res.redirect(`/posts/${post._id}`)
}

module.exports.deleteComment = async(req, res) =>{
    const { id, commentId } = req.params
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } })
    await Comment.findByIdAndDelete(commentId)
    req.flash('success', 'You deleted your comment :( ');
    res.redirect(`/posts/${id}`)
}

module.exports.addRate = async(req, res) => {
    const { id, commentId } = req.params
    const like = new Comment(req.body.comments)
    const user = await User.findById(req.user._id)
    const comment = await Comment.findByIdAndUpdate(commentId, {likes: like.likes + 1 })
    user.likedComments.push(comment._id)
    await comment.save()
    await user.save()
    res.redirect(`/posts/${id}`)
}

module.exports.substractRate = async(req, res) => {
    const { id, commentId } = req.params
    const like = new Comment(req.body.comments)
    const comment = await Comment.findByIdAndUpdate(commentId, {likes: like.likes - 1 })
    const user = await User.findByIdAndUpdate(req.user._id, {likedComments: !comment._id})
    await comment.save()
    await user.save()
    res.redirect(`/posts/${id}`)
}
