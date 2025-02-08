import joi from "joi";

const userUpdateValidation = joi.object({
    name: {
        first: joi.string().min(3).max(15).required(),
        middle: joi.string().allow(''),
        last: joi.string().min(3).max(15).required()
    },
    image: {
        url: joi.string().required(),
        alt: joi.string().required()
    },

    isBusiness: joi.boolean().default(false),
    isAdmin: joi.boolean().default(false),
    phone: joi.number().min(9).required(),
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/).required(),

    address: {
        state: joi.string().allow(''),
        country: joi.string().min(2).required(),
        city: joi.string().min(2).required(),
        street: joi.string().min(2).required(),
        houseNumber: joi.number().min(1).required(),
        zip: joi.number().min(2).required()
    }
}
);

export default userUpdateValidation;