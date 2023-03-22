import * as Joi from 'joi';

export function validate(config: any) {
  const schema = Joi.object({
    app: Joi.object({
      port: Joi.number().integer().min(0).max(65535),
    }),
    database: Joi.object({
      provider: Joi.string().required(),
      host: Joi.string().required(),
      port: Joi.number().integer().min(0).max(65535),
      user: Joi.string().required(),
      password: Joi.string().required(),
      database: Joi.string().required(),
      ssl: Joi.boolean(),
    }),
  });

  return schema.validate(config, { allowUnknown: true, abortEarly: false });
}