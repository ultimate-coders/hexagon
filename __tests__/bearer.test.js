/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

require('dotenv').config();
process.env.TEST_MODE = true;
const  client  = require('../src/models/db');
const {createToken,getTokenByUserId} = require('../src/auth/models/jwt');
const bearerMiddleware = require('../src/auth/middleware/bearer');
const {authenticateWithToken} = require('../src/auth/models/helpers');
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
      await client.query(`DELETE FROM PROFILE WHERE first_name='melon';`);
      let safeValues = [idValue];
      let SQL = (`DELETE FROM JWT WHERE id=$1;`);
      await client.query(SQL,safeValues);
      await client.query(`DELETE FROM CLIENT WHERE user_name='melon';`);
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
    it('It will allow access using bearer authentication', async ()=> {
      const testFun = jest.fn(authenticateWithToken);
      let testToken = 'badToken';
      let testValue = await testFun(acToken);
      //   let testFailValue = await testFun(acToken,'refresh');

        
      //   expect(() => testFailValue).toThrow('Invalid Token');
        
      expect(testValue.id).toEqual(idValue);
    //   expect(testFun(acToken,'refresh')).toMatch('error');
    });

  });

});