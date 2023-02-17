const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

// Create a connection to the database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'company_db'
});

// Connect to the database
connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the company_db database.');
});

// Export the connection
module.exports = connection;


