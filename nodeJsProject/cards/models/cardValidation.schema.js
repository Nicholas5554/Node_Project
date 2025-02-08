import joi from "joi";

const cardValidation = joi.object({
    title: joi.string().min(3).required(),
    subTitle: joi.string().min(3).required(),
    description: joi.string().min(3).required(),
    phone: joi.number().min(9).required(),
    email: joi.string().email().required(),
    web: joi.string().required(),
    image: {
        url: joi.string().required(),
        alt: joi.string().required()
    },
    address: {
        state: joi.string().allow(''),
        country: joi.string().min(2).required(),
        city: joi.string().min(2).required(),
        street: joi.string().min(2).required(),
        houseNumber: joi.number().min(2).required(),
        zip: joi.number().min(5).required()
    }
});

export default cardValidation;