'use strict';

import * as restify from 'restify';
import * as jwt from 'jsonwebtoken';
import * as HTTPStatus from 'http-status';

import config from '../../config';
import {User} from '../models/user';
import {RequestEx} from '../interfaces';

export function create(req: RequestEx, res: restify.Response) {

  req.checkBody('name', 'name can not be empty').notEmpty();
  req.checkBody('email', 'email is invalid').isEmail().notEmpty();
  req.checkBody('password', 'password can not be empty').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.send(HTTPStatus.BAD_REQUEST, errors);
    return;
  }

  const params = req.body;
  User.create(params, (err, response) => {
    if (err) {
      res.send(HTTPStatus.BAD_REQUEST);
      return;
    }
    res.send(HTTPStatus.CREATED);
  });
}

export function login(req: RequestEx, res: restify.Response) {
  // since we are using the basic middleware here we simply
  // compute the JWT token

  var token = jwt.sign({
    email: req.user
  }, config.JWT_TOKEN_KEY);

  res.json({
    success: true,
    token: token
  });
}
