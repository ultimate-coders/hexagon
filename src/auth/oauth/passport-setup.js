'use stirct';

const passport = require('passport');
const {createUser,getEmail, getUserById} = require ('../models/user');
const {createToken,updateToken} = require ('../models/jwt');


var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `/auth/google/callback`,
},
async function(accessToken, refreshToken, profile, cb) {

  let googleId = profile.id;
  // let googleUser = profile.name.givenName;
  let googleEmail = profile._json.email;

  let user = await getUserById(googleId,'google');
  let email = await getEmail(googleEmail);

  // console.log(profile);
  // console.log('user email ',googleEmail);
  // console.log('user ',googleUser);
  // console.log('user id ',googleId);

  if(!user && !email) {
    console.log('sign up ');
    user = await createUser(profile);
    let userTokens = await createToken(user.id);
    return cb(null,userTokens);
  }
  else if (email)
  {
    console.log('sign in ');
    let userTokens = await updateToken(user.id);
    return cb(null,userTokens);

  }
  else
  {
    console.log('bad request');
    return cb('Sorry, either username or email or both are already in use!');
  }

},
));
passport.serializeUser((user, cb) => {
  cb(null, user);
});passport.deserializeUser((obj, cb) => {
  cb(null, obj);
}); 

module.exports= passport;