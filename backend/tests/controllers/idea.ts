'use strict';

import config from '../../config';
import app from '../../app';
import * as supertest from 'supertest';
import * as chai from 'chai';
import * as HTTPStatus from 'http-status';
import * as utils from './utils';

describe('Idea Controller Web API testing', function() {

  // use the should
  chai.should();

  const app_url = 'http://localhost:8900/';
  const api = supertest.agent(app_url);

  const VALID_TEST_USER_EMAIL = 'fakeuser@fakecompany.com';
  const VALID_TEST_USER_PWD = 'fakeuser';

  const INVALID_TEST_USER_EMAIL = 'incorrect@incorrect.com';
  const INVALID_TEST_USER_PWD = 'incorrect';

  const API_ENDPOINT_CREATE = 'idea/create';
  const API_ENDPOINT_LIST = 'idea/list';

  var jwt_token = null;

  before(function(done) {
    utils.getJWTToken(api, VALID_TEST_USER_EMAIL, VALID_TEST_USER_PWD).then(function(token) {
      jwt_token = token;
      done();
    }).catch((err) => done(err));
  });

  describe('API : create', function() {

    it('should fail when user supplies invalid credentials', function(done) {
      api.post(API_ENDPOINT_CREATE)
        .set('Authorization', 'JWT ' + 'iamabadtoken')
        .expect(HTTPStatus.UNAUTHORIZED, done);
    });

    it('should fail when user supplies no credentials', function(done) {
      api.post(API_ENDPOINT_CREATE)
        .expect(HTTPStatus.UNAUTHORIZED, done);
    });

    it('should fail when required fields are not specified', function(done) {
      api.post(API_ENDPOINT_CREATE)
        .set('Authorization', 'JWT ' + jwt_token)
        .expect(HTTPStatus.BAD_REQUEST, done);
    });


    it('should work when required fields are specified and logged in', function(done) {
      api.post(API_ENDPOINT_CREATE)
        .set('Authorization', 'JWT ' + jwt_token)
        .send(
        {
          title: 'This is first idea'
        })
        .expect(HTTPStatus.CREATED, done);
    });

  });

  describe('API : list', function() {

    it('should fail when user supplies invalid credentials', function(done) {
      api.get(API_ENDPOINT_LIST)
        .set('Authorization', 'JWT ' + 'iamabadtoken')
        .expect(HTTPStatus.UNAUTHORIZED, done);
    });

    it('should fail when user supplies no credentials', function(done) {
      api.get(API_ENDPOINT_LIST)
        .expect(HTTPStatus.UNAUTHORIZED, done);
    });

    it.only('should work when required fields are specified and logged in', function(done) {
      api.get(API_ENDPOINT_LIST)
        .set('Authorization', 'JWT ' + jwt_token)
        .expect(HTTPStatus.OK)
        .end(
        function(err, res) {
          if (err) {
            return done(err);
          }

          var body = res.body;

          console.log(body);

          done();
        });
    });

  });

});
