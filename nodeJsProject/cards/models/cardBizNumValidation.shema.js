import joi from 'joi';

const cardBizNumValidation = joi.object({
    bizNumber: joi.number().min(1000000).max(9999999)
});

export default cardBizNumValidation;