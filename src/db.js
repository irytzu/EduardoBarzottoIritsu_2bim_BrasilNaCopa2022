const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'wc_convocacoes',
  user: 'postgres',
  password: '15122009',
});

module.exports = pool;