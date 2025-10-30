import { knex as knexConfig } from 'knex';

export const knex = knexConfig({
  client: 'pg',
  connection: {
    host: process.env.PG_HOST || '',
    user: process.env.PG_USER || '',
    password: process.env.PG_PASSWORD || '',
    database: process.env.PG_DATABASE || '',
    port: (process.env.PG_PORT as unknown as number) || 5432,
  },
});
