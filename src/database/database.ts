// import mysql from 'mysql';

// export const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: '_skylevel'
// });

// connection.connect(err => {
//     if (err) {
//         console.error('Error connecting to the database:', err.stack);
//         return;
//     }
//     console.log('Connected to the database as id', connection.threadId);
// });
// app.js
const postgres = require('postgres');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});





