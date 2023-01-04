const mysql = require('mysql2/promise');
require('dotenv').config()
// create the connection to database
const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PASS,
};

async function query(sql, params) {
    const connection = await mysql.createConnection(config);
    const [results, ] = await connection.execute(sql, params);
    connection.end();
    return results;
}

function fetch(rows) {
    if (!rows) {
      return [];
    }
    return rows;
}

  module.exports = {
      query,
      fetch
  }
