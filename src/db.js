
const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "15122009",
    database: "acmf trabalho dw",
    port: 5432
});

module.exports = pool;