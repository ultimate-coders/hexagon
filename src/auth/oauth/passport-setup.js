'use strict';

const passport = require('passport');
const { createUser, getUserByEmail, getUserById } = require('../models/user');
const { createToken, deleteToken } = require('../models/jwt');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/auth/google/callback`,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let googleId = profile.id;
        let googleEmail = profile._json.email;

        let user = await getUserById(googleId, 'google');
        let email = await getUserByEmail(googleEmail);
        console.log('dfdfdsfds : ', user, email, !user && !email);
        if (!user && !email) {
          user = await createUser(profile);
          let userTokens = await createToken(user.id);
          delete user.hashed_password;
          delete userTokens.user_id;
          return cb(null, { user, userTokens });
        } else if (user) {
          await deleteToken(user.id);
          let userTokens = await createToken(user.id);
          delete user.hashed_password;
          delete userTokens.user_id;
          return cb(null, { user, userTokens });
        } else {
          return cb(
            'Sorry, either username or email or both are already in use!'
          );
        }
      } catch (e) {
        cb(e);
      }
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
