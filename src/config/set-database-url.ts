import { config } from './config';

function createDatabaseUrl(databaseConfig: typeof config.database) {
  return `postgresql://${databaseConfig.user}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`;
}

const databaseUrl = createDatabaseUrl(config.database);
process.env.DATABASE_URL = databaseUrl;
