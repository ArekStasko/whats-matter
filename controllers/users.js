const User = require('../models/users')


module.exports.register = async(req, res) => {
    res.render('users/register')
}

module.exports.registerPost = async(req, res, next) => {
    try{
        const {email, username, password} = req.body
        const user = new User({email, username})
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if(err) return next(err)
            req.flash('success', 'welcome on board arrr !')
            res.redirect('/posts')
        })
    } catch (e) {
        req.flash('error', e.message)
        req.redirect('register')
    }
}

module.exports.login = async(req, res) => {
    res.render('users/login')
}

module.exports.loginPost = async(req, res) => {
    const redirectUrl = req.session.returnTo || '/posts'
    delete req.session.returnTo
    req.flash('success', 'Hello again !')
    res.redirect(redirectUrl)
}

module.exports.logout = async(req, res) => {
    req.logout()
    req.flash('success', 'See you bye !')
    res.redirect('/posts')
}