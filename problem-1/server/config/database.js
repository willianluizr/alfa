const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'alfa',
  password: 'G@>T3wAdEqzsmb+c',
  port: 5432,
});

module.exports = pool;
