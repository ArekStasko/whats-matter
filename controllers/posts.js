const Post = require('../models/posts')


const categories = ['Political', 'Thoughts', 'Ideological']

module.exports.index = async (req, res) => {
    const posts = await Post.find({}).populate('author')
    res.render('posts', { posts })
}

module.exports.new = async (req, res) => {
    res.render('posts/new', { categories })
}

module.exports.createPost = async(req, res) => {
    const post = new Post(req.body)
    post.author = req.user._id
    await post.save()
    req.flash('success', 'Thank you, for new post ! :D')
    res.redirect('/posts')
}

module.exports.showPost = async(req, res) => {
    const post = await Post.findById(req.params.id).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate('author')
    if(!post) {
        console.log('ERROR')
        return res.redirect('/posts');
    }
    res.render('posts/showPost', { post })
}

module.exports.deletePost = async(req, res) => {
    const { id } = req.params
    await Post.findByIdAndDelete(id)
    req.flash('success', 'You deleted your post ! :(')
    res.redirect('/posts')
}

module.exports.renderUpdate = async(req, res) => {
    const { id } = req.params
    const post = await Post.findById(id)
    if(!post) {
        console.log('ERROR')
        return res.redirect('/posts');
    }
    res.render('posts/update', { post, categories })
}

module.exports.updatePost = async(req, res) => {
    const { id } = req.params
    const post = await Post.findByIdAndUpdate(id, { ...req.body.post })
    await post.save()
    req.flash('success', 'You updated your post')
    res.redirect(`/posts/${post._id}`)
}