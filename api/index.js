const express = require("express");
const session = require("express-session");
const path = require("path");
const serverless = require("serverless-http");

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
app.use('/static', express.static(path.join(__dirname, '../static')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

// Your routes
app.get('/', (req, res) => res.render('index.pug'));
app.get('/contact', (req, res) => res.render('contact.pug'));
app.get('/services', (req, res) => res.render('services.pug'));
app.get('/aboutus', (req, res) => res.render('aboutus.pug'));
app.get('/classinfo', (req, res) => res.render('classinfo.pug'));
app.get('/enroll', (req, res) => res.render('enroll.pug'));
app.get('/signup', (req, res) => res.render('register.pug'));
app.get('/login', (req, res) => res.render('register.pug'));

module.exports = app;
module.exports.handler = serverless(app);
