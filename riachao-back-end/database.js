const db = require('mysql2');

// Create a new connection
const connection = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Marc3code',
  database: 'riachao_catalogo',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database');
});

module.exports = connection;