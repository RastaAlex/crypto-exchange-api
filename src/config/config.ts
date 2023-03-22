import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { validate } from './config.validation';

const envPath = resolve(__dirname, '..', '..', '.env');

dotenv.config({ path: envPath });

if (!existsSync(envPath)) {
  throw new Error('Please create a .env file in the root folder.');
}

export const config = {
  app: {
    port: parseInt(process.env.API_PORT as string, 10) || 3000,
  },
  database: {
    provider: 'postgresql',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT as string, 10),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV === 'production',
  },
};

const validationResult = validate(config);
if (validationResult.error) {
  throw new Error(`Invalid configuration: ${validationResult.error.message}`);
}