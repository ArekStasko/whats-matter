const Joi = require('joi')


module.exports.postSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required()
})

module.exports.commentSchema = Joi.object({
    comments: Joi.object({
        body: Joi.string().required()
    }).required()
})