import joi from "joi";

const updateUserSchema = joi.object({
    name: joi.object()
        .keys({
            first: joi.string().min(2).max(256).required(),
            middle: joi.string().min(2).max(256).allow(""),
            last: joi.string().min(2).max(256).required(),
        })
        .required(),

    phone: joi.string()
        .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
        .rule({ message: 'user "phone" mast be a valid phone number' })
        .required(),

    image: joi.object()
        .keys({
            url: joi.string()
                .uri()
                .rule({ message: "user image mast be a valid url" })
                .allow(""),
            alt: joi.string().min(2).max(256).allow(""),
        })
        .required(),

    address: joi.object()
        .keys({
            state: joi.string().allow(""),
            country: joi.string().required(),
            city: joi.string().required(),
            street: joi.string().required(),
            houseNumber: joi.number().required(),
            zip: joi.number(),
        })
        .required(),
});

export default updateUserSchema;