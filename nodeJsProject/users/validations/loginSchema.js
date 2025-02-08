import joi from "joi";

const loginSchema = joi.object({
    email: joi.string().email({ tlds: { allow: false } })
        .ruleset.pattern(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,6})$/
        )
        .rule({ message: 'user "mail" mast be a valid email' })
        .required(),
    password: joi.string()
        .ruleset.regex(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*-]).{6,20}$/
        )
        .rule({
            message:
                'user "password" must be at least six characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-',
        })
        .required(),
});

export default loginSchema;