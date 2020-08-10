// Dependencies

const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

// Imports
require('./db');
const { MemesRouter, GifsRouter, PunsRouter, UsersRouter, GeneralRouter } = require('./routes');

// Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const whitelist = ['https://playboy-starter-pack-frontend.herokuapp.com/', 'http://localhost:8000']
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/app', MemesRouter, GifsRouter, PunsRouter, UsersRouter, GeneralRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
