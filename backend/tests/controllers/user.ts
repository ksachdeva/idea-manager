'use strict';

import config from '../../config';
import app from '../../app';
import * as supertest from 'supertest';
import * as chai from 'chai';
import * as HTTPStatus from 'http-status';

describe('User Controller Web API testing', function() {

  // use the should
  chai.should();

  const app_url = 'http://localhost:8900/user/';
  const api = supertest.agent(app_url);

  const VALID_TEST_USER_EMAIL = 'fakeuser@fakecompany.com';
  const VALID_TEST_USER_PWD = 'fakeuser';

  const INVALID_TEST_USER_EMAIL = 'incorrect@incorrect.com';
  const INVALID_TEST_USER_PWD = 'incorrect';

  const API_ENDPOINT_LOGIN = 'login';
  const API_ENDPOINT_REGISTER = 'register';

  describe('API : login', function() {

    it('should fail login when user supplies invalid credentials', function(done) {
      api.post(API_ENDPOINT_LOGIN)
        .auth(INVALID_TEST_USER_EMAIL, INVALID_TEST_USER_PWD)
        .expect(HTTPStatus.UNAUTHORIZED, done);
    });

    it('should fail login when user supplies empty user email', function(done) {
      api.post(API_ENDPOINT_LOGIN)
        .auth('', INVALID_TEST_USER_PWD)
        .expect(HTTPStatus.UNAUTHORIZED, done);
    });

    it('should accept correct credentials of the user', function(done) {
      api.post(API_ENDPOINT_LOGIN)
        .auth(VALID_TEST_USER_EMAIL, VALID_TEST_USER_PWD)
        .expect(HTTPStatus.OK)
        .end(function(err, res) {
        if (err) {
          return done(err);
        }

        var body = res.body;

        body.should.be.an('object');
        body.should.have.property('success');
        body.should.have.property('token');

        done();
      });
    });
  });

  describe('API : register', function() {

    it('should fail if user does not supply required fields', function(done) {
      api.post(API_ENDPOINT_REGISTER)
        .send(
        {
          name: 'Test User',
          email: INVALID_TEST_USER_EMAIL
        })
        .expect(HTTPStatus.BAD_REQUEST, done);
    });

  });

});
