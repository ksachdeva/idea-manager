'use strict';

import * as bcrypt from 'bcrypt';
import * as mongo from 'mongoose';
import * as BB from 'bluebird';

const SALT_WORK_FACTOR = 10; // TODO: change

export const UserSchema = new mongo.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String },
  admin: Boolean,
  created_at: Date,
  updated_at: Date
});

function hashNewPassword(passwordRaw) {
  return new BB(function(resolve, reject) {
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {
        reject(err);
        return;
      }
      // hash the password along with our new salt
      bcrypt.hash(passwordRaw, salt, function(err, hash) {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          salt,
          hash
        });
      });
    });
  });
}

function hashPassword(passwordRaw, salt) {
  return new BB(function(resolve, reject) {
    bcrypt.hash(passwordRaw, salt, function(err, hash) {
      if (err) {
        reject(err);
        return;
      }
      resolve(hash);
    });
  });
}

export function verifyPassword(passwordRaw, salt, hashedPassword) {
  return hashPassword(passwordRaw, salt).then((hash) => {
    return hash === hashedPassword;
  });
}

UserSchema.pre('save', function(next) {
  const user = this;

  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  user.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!user.created_at)
    user.created_at = currentDate;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password'))
    return next();

  hashNewPassword(user.password).then((res: any) => {
    user.password = res.hash;
    user.salt = res.salt;
    next();
  }).catch((err) => next(err));

});

export const User = mongo.model('User', UserSchema);
