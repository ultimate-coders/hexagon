/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

require('dotenv').config();
process.env.TEST_MODE = true;
const  client  = require('../src/models/db');
const {createToken,getTokenByUserId} = require('../src/auth/models/jwt');
const bearerMiddleware = require('../src/auth/middleware/bearer');

(async ()=>{
  await client.connect();
})();

const server = require('../src/server');
const superTest = require ('supertest');
const serverRequest = superTest(server.app);

describe('Auth Middleware', () => {

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('bearer authentication',()=> {

    let idValue;
    let acToken;

    beforeAll(async()=>{
      let query = await client.query(`INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('melon','mmm','watermelon@yahoo.com',true) RETURNING id;`);
      idValue = query.rows[0].id;
      await createToken(idValue);
      let userTokens = await getTokenByUserId(idValue);
      acToken = userTokens.access_token;
      
    });

    afterAll(async()=>{
      await client.query(`
      DELETE FROM FOLLOW;
      DELETE FROM PROFILE;
      DELETE FROM JWT;
      DELETE FROM CLIENT;`);
      client.end();
    });


    it('It will allow access using bearer authentication', async ()=> {

      req.headers = {
        authorization: `Bearer ${acToken}`,
      };


      return bearerMiddleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalled();
        });

    });

    it('It will allow access using bearer authentication', async ()=> {

      req.headers = {
        authorization: 'Bearer thisisabadtoken',
      };
    
      return bearerMiddleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith('Invalid Login');
        });
    });

  });

});