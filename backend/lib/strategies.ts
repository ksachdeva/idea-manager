'use strict';

import config from '../config';
import { Strategy as JwtStrategy, ExtractJwt} from  'passport-jwt';
import { BasicStrategy} from  'passport-http';
import {verifyPassword, User} from './models/user';

export const jwtStrategy = new JwtStrategy({
  secretOrKey: config.JWT_TOKEN_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
}, (jwt_payload, done) => done(null, jwt_payload.email));

export const basicStrategy = new BasicStrategy(function(username, password, done) {

  User.findOne({
    email: username
  }, (error, result: any) => {
      if (error) {
        done(null, false);
        return;
      }

      verifyPassword(password, result.salt, result.password).then((isCorrect) => {
        if (isCorrect) {
          done(null, username);
          return;
        }
        done(null, false);
      }).catch(error => done(null, false));

    });
});
