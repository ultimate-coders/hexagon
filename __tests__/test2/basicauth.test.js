'use strict';
require('dotenv').config();
process.env.TEST_MODE = true;
process.env.DATABASE_URL_TEST = process.env.DATABASE_URL_TEST2;
const  client  = require('../../src/models/db');
(async ()=>{
  await client.connect();
})();
const { app } = require('../../src/server');
const superTest = require('supertest');
// const { expect } = require('chai');
const request = superTest(app);

const middleware = require('../../src/auth/middleware/basic');

let users = {
  admin: { user_name: 'admin', email: 'admin@yahoo.com',  password: 'Password1@' },
};
console.log('🚀 ~ file: basicauth.test.js ~ line 18 ~ users', users.admin);

// Pre-load our database with fake users
beforeAll( async () => {
  let res = await request.post('/auth/signup').send(users.admin);
  // console.log('🚀 ~ file: basicauth.test.js ~ line 22 ~ beforeAll ~ res', res.error);
 
});

describe('Auth Middleware', () => {
  afterAll(()=>{
    client.end();
  });
  // admin:password: YWRtaW46cGFzc3dvcmQ=
  // admin:foo: YWRtaW46Zm9v

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', () => {

      // Change the request to match this test case
      req.headers = {
        authorization: 'Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      };

      return middleware(req, res, next)
        .then(() => {
          console.log('🚀 ~ file: basicauth.test.js ~ line 53 ~ it ~ res', res.status);
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });

    }); // it()

    it('logs in an admin user with the right credentials', () => {

      // Change the request to match this test case
      req.headers = {
        authorization: 'Basic YWRtaW5AeWFob28uY29tOlBhc3N3b3JkMUA=',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    }); // it()

  });

});