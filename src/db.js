const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'EduardoBarzottoIritsu_2bim_BrasilNaCopa2022',
    user: 'postgres',
    password: '15122009',
});

module.exports = pool;