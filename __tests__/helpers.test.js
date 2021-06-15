/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

require('dotenv').config();
process.env.TEST_MODE = true;
const  client  = require('../src/models/db');
const bcrypt = require('bcrypt');
const {createToken,getTokenByUserId} = require('../src/auth/models/jwt');
const {authenticateWithToken,authenticateBasic,getToken} = require('../src/auth/models/helpers');
const {getUserById} = require('../src/auth/models/user');

const server = require('../src/server');
const superTest = require ('supertest');
const serverRequest = superTest(server.app);

(async ()=>{
  await client.connect();
})();


describe('Auth Middleware', () => {

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('Helpers testing',()=> {

    let idValue;
    let acToken;
    let userEmail;
    let userPassword;

    beforeAll(async()=>{
      let password = await bcrypt.hash('123', 10);
      let passValue =[password];
      let SQL = `INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('melon',$1,'watermelon@yahoo.com',true) RETURNING *;`;

      let query = await client.query(SQL,passValue);

      userEmail = query.rows[0].email;
      userPassword = query.rows[0].hashed_password;
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

    it(('authenticateBasic Helper test'), async ()=> {
      const testFun = jest.fn(authenticateBasic);
      let testValue = await testFun(userEmail,'123');
      //   let testFailValue = await testFun(userEmail,'1223');

        
      expect(testValue.id).toEqual(idValue);
      expect(testValue.user_name).toEqual('melon');
      expect(testValue.hashed_password).toEqual(userPassword);
      expect(testValue.email).toEqual('watermelon@yahoo.com');
      expect(testValue.google_id).toEqual(null);
      expect(testValue.verified).toEqual(true);

      //   expect(testValue).toEqual(1);

    });

    it('AuthenticateWithToken Helper test', async ()=> {
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