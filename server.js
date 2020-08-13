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
app.use(
  cors({
    origin: ['https://playboy-starter-pack-frontend.herokuapp.com', 'http://localhost:8000'],
    credentials: true,
    methods: 'GET, PUT, POST, DELETE'
  })
);

// let sess = {
//   secret: 'secretcode',
//   resave: true,
//   saveUninitialized: true,
//   cookie: {}
// }

// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }

// app.use(session(sess));

app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', MemesRouter, GifsRouter, PunsRouter, UsersRouter, GeneralRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
