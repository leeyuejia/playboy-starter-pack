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

let allowedOrigins = ['http://localhost:8000', 'https://playboy-starter-pack-frontend.herokuapp.com'];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let msg = 'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
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
