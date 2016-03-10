'use strict';

import config from '../../config';
import * as supertest from 'supertest';
import * as chai from 'chai';
import * as HTTPStatus from 'http-status';
import * as BB from 'bluebird';

var API_ENDPOINT_LOGIN = 'user/login';

export function getJWTToken(api, username, password) {
  return new BB(function(resolve, reject) {
    api.post(API_ENDPOINT_LOGIN)
      .auth(username, password)
      .expect(HTTPStatus.OK)
      .end(function(err, res) {
      if (err) {
        reject(err);
        return;
      }
      resolve(res.body.token);
    });
  });
};
