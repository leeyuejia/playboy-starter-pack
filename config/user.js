const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
    console.log(`serial with ${user._id}`)
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      console.log('line 31',user._id)
      console.log('line 32',id)
      console.log(`deserial with ${id}`)
      cb(null, user);
    });
  });
};