import Joi from 'joi';

export default Joi.object({
  JWT_AT_SECRET: Joi
    .string()
    .required(),
  JWT_AT_EXPIRES_IN: Joi
    .number()
    .required(),
  JWT_RT_SECRET: Joi
    .string()
    .required(),
  JWT_RT_EXPIRES_IN: Joi
    .number()
    .required(),
});
