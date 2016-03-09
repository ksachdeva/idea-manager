'use strict';

import * as restify from 'restify';
import * as jwt from 'jsonwebtoken';

import config from '../../config';
import {User} from '../models/user';
import {RequestEx} from '../interfaces';

export function create(req: restify.Request, res: restify.Response) {
  const params = req.body;
  User.create(params, (err, response) => {
    if (err) {
      res.send(500);
      return;
    }
    res.send(201);
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
