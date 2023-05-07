import Joi from 'joi';

const DEFAULT_SMTP_PORT = 465;

export default Joi.object({
  JWT_AT_SECRET: Joi
    .string()
    .required(),
  JWT_AT_EXPIRES_IN: Joi
    .string()
    .required(),
  JWT_RT_SECRET: Joi
    .string()
    .required(),
  JWT_RT_EXPIRES_IN: Joi
    .string()
    .required(),

  SMTP_HOST: Joi
    .string()
    .hostname()
    .required(),
  SMTP_PORT: Joi
    .number()
    .port()
    .default(DEFAULT_SMTP_PORT)
    .required(),
  SMTP_SECURE: Joi
    .bool()
    .default(false),
  SMTP_USER: Joi
    .string(),
  SMTP_PASS: Joi
    .string(),
});
