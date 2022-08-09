import { createPool } from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import config from '@config/config';

export const sequelize = new Sequelize(`${config.database}`, `${config.user}`, `${config.password}`, {
  host: config.host,
  dialect: 'mysql',
  logging: false,
});

async function connect() {
  const connection = await createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port,
    connectionLimit: 10,
    multipleStatements: true,
  });
  return connection;
}

export default connect;
