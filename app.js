const express = require("express");
const session = require('express-session');

const path = require("path");
const fs = require("fs");
const app = express();


app.use(session({
  secret: 'r0n1t$-SuperSecret-123!@#secureKey',  
  resave: false,
  saveUninitialized: false
}));


app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


app.use(express.urlencoded({ extended: true }));

//for database
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');


const port = 80;

app.use('/static', express.static('static'))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  const params = {}
  res.status(200).render('index.pug', params);
})

app.get('/contact', (req, res) => {
  const params = {}
  res.status(200).render('contact.pug', params);
})

app.get('/services', (req, res) => {
  const params = {}
  res.status(200).render('services.pug', params);
})


app.get('/aboutus', (req, res) => {
  const params = {}
  res.status(200).render('aboutus.pug', params);
})

app.get('/classinfo', (req, res) => {
  const params = {}
  res.status(200).render('classinfo.pug', params);
})


//database


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mmmmmmmm12@',
  database: 'authentication'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected');
});

// Routes
app.get('/signup', (req, res) => res.render('signup'));
app.get('/login', (req, res) => res.render('login'));

// Signup logic
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  db.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], (err, results) => {
    if (results.length > 0) {
      const errorMessage = results.some(r => r.email === email) ? 'Email already exists' : 'Username taken';
      return res.render('signup', { message: errorMessage });
    }
    
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err) => {
        if (err) return res.render('signup', { message: 'Error occurred during signup' });
        res.render('signup', { message: 'Signup successful!' }); // Important
      });
    });
  });

// Login logic
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.render('login', { message: 'Invalid email or user does not exist.' });
    }
    
    const match = await bcrypt.compare(password, results[0].password);
    
    if (match) {
      // Set user session
      req.session.user = {
        id: results[0].id,
        username: results[0].username,
        email: results[0].email
      };
      
      res.render('login', { message: 'Login successful!' }); // Triggers redirect via JS
    } else {
      res.render('login', { message: 'Incorrect password' });
    }
  });
});





app.post('/contact', (req, res) => {
  const { firstName, lastName, email, phone, street, city, brief } = req.body;

  const sql = `INSERT INTO contact_submissions 
    (firstName, lastName, email, phone, street, city, brief)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const values = [firstName, lastName, email, phone, street, city, brief];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting contact data:', err);
      return res.render('contact', { message: 'Something went wrong. Try again.', error: true });
    }
    res.render('contact', { message: 'Your message has been received.', success: true });
  });
});




app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Error destroying session:', err);
      return res.redirect('/index'); // Optional fallback
    }
    res.clearCookie('connect.sid'); // Optional: clear session cookie
    res.redirect('/login'); // Redirect after logout
  });
});


app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`)
})