const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const sql = require('./sql');

/* SECRET */
var server_secret = 'this is extremely secret!';

passport.use(new LocalStrategy(
  function(username, password, done) {
    return sql("SELECT id, username FROM users WHERE username=@user AND password=@pass", {user: username, pass: password}).then(result => {
      if (result !== null)
        return done(null, result[0]);
      else
        return done(null, false);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = {
  passport: passport,
  check: expressJwt({secret: server_secret}),
  generateToken(user) {
    return jwt.sign({
      user: user
    }, server_secret, {
      expiresIn: 120 * 60
    });
  }
}