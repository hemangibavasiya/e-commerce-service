// VALIDATION

const Joi = require('@hapi/joi')


const productBodyValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(10).required(),
        price: Joi.number().required(),
        quantity: Joi.number().required()
    })
    return schema.validate(data)
}

const addCartBodyValidation = (data) => {
    const schema = Joi.object({
        product_id: Joi.number().required(),
        quantity: Joi.number().required()
    })
    return schema.validate(data)
}

module.exports = {
    productBodyValidation,
    addCartBodyValidation
}
