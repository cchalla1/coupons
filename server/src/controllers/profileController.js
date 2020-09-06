import jwt from 'express-jwt';
import mongoose from 'mongoose';
import passport from 'passport';

const getTokenFromHeaders = req => {
  const {
    headers: {authorization},
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }

  return null;
};

export const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

export const register = (req, res) => {
  const Profiles = mongoose.model('Profiles');
  const {
    body: {profile},
  } = req;
  console.log('register', profile);
  if (!profile.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!profile.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  profile.active = true;
  const finalUser = new Profiles(profile);

  finalUser.setPassword(profile.password);
  finalUser.save(function (err) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.json({user: finalUser.toAuthJSON()});
  });
};

export const login = (req, res, next) => {
  const {
    body: {profile},
  } = req;

  if (!profile.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!profile.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate(
    'local',
    {session: false},
    (err, passportUser) => {
      if (err) {
        return res.status(401).send(err);
      }
      console.log(passportUser);

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateToken();

        return res.json({user: user.toAuthJSON()});
      }

      return res.status(500).send({message: 'Invalid username or password'});
    }
  )(req, res, next);
};

export const logout = (req, res) => {
  req.session.destroy(function (err) {
    console.log(req.payload.id);
    req.logout();
    if (err) {
      res.status(500).send(err);
    }
    res.json({message: 'User logged out', success: 'true'});
  });
};

export const getCurrentProfile = (req, res) => {
  const Profiles = mongoose.model('Profiles');
  const {
    payload: {id},
  } = req;

  return Profiles.findById(id).then(profile => {
    if (!profile) {
      return res.sendStatus(400);
    }

    return res.json({profile: profile.toAuthJSON()});
  });
};
