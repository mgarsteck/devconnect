const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


// ROUTES
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MONGO DB STUFF
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MONGODB CONNECTED'))
  .catch(err => console.log(err));


// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport.js')(passport);

// USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.get('/', (req, res) => res.send('hello there'));

// SERVER STUFF
const port  = process.env.PORT || 5000;

app.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));
