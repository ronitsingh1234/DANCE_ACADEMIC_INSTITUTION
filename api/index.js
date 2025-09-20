// api/index.js
const express = require("express");
const session = require("express-session");
const path = require("path");

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

// Use process.cwd() so paths are correct in Vercel serverless environment
app.use('/static', express.static(path.join(process.cwd(), 'static')));

app.set('view engine', 'pug');
// views folder at project root
app.set('views', path.join(process.cwd(), 'views'));

// routes (render template names without .pug)
app.get('/', (req, res) => res.render('index'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/services', (req, res) => res.render('services'));
app.get('/aboutus', (req, res) => res.render('aboutus'));
app.get('/classinfo', (req, res) => res.render('classinfo'));
app.get('/enroll', (req, res) => res.render('enroll'));
app.get('/signup', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('register'));

// Export the Express app as the handler for Vercel
module.exports = app;
