const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);`);
});

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Registration (Insecure Password Storage)
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`; // SQL Injection vulnerability
  db.run(query, err => {
    if (err) {
      res.send('Error: ' + err.message);
    } else {
      res.send('User registered.');
    }
  });
});

// Login (Vulnerable to SQL Injection)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`; // SQL Injection vulnerability
  db.get(query, (err, row) => {
    if (row) {
      res.send(`Welcome ${row.username}`);
    } else {
      res.send('Invalid credentials');
    }
  });
});

// XSS Demo Page
app.get('/xss', (req, res) => {
  const message = req.query.message || '';
  res.send(`<h1>XSS Demo</h1><p>${message}</p>`); // XSS vulnerability
});

app.listen(port, () => {
  console.log(`Vulnerable app listening at http://localhost:${port}`);
});
