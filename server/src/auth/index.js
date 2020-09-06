import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';

const createAuth = app => {
  const Profiles = mongoose.model('Profiles');
  app.use(
    session({
      secret: 'caon-project',
      cookie: {maxAge: 60000},
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(err.status).send({message: 'Unauthorized'});
    }
    next();
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'profile[email]',
        passwordField: 'profile[password]',
      },
      (email, password, done) => {
        Profiles.findOne({email})
          .then(profile => {
            if (!profile || !profile.validateProfile(password)) {
              return done(null, false, {
                errors: {'email or password': 'is invalid'},
              });
            }

            return done(null, profile);
          })
          .catch(done);
      }
    )
  );
};

export default createAuth;
