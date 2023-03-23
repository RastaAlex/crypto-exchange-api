import * as Joi from 'joi';

interface AppConfig {
  app: {
    port: number;
  };
  database: {
    provider: string;
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    ssl: boolean;
  };
}

export function validate(config: AppConfig) {
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
