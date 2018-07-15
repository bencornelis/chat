import { knexSnakeCaseMappers } from '../utils/case';
import knex from 'knex';

const postgresDB = knex(Object.assign({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user : process.env.POSTGRES_USER,
    password : process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  },
  migrations: {
    tableName: 'migrations'
  },
  debug: process.env.POSTGRES_DEBUG,
}), knexSnakeCaseMappers());

postgresDB.migrate.latest();

export default postgresDB;
