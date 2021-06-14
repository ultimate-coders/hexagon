/* eslint-disable no-undef */
'use strict';

require('dotenv').config();
process.env.TEST_MODE = true;
const  client  = require('../src/models/db');
const {createToken,getTokenByUserId} = require('../src/auth/models/jwt');
const middleware = require('../src/auth/middleware/bearer');
const {meHandler} = require('../src/controllers/profileController');
(async ()=>{
  await client.connect();
})();

const server = require('../src/server');
const superTest = require ('supertest');
const serverRequest = superTest(server.app);

describe('Auth Middleware', () => {

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user profile endpints',()=> {

    let idValue;
    let acToken;

    beforeAll(async()=>{
      let query = await client.query(`INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('melon','mmm','watermelon@yahoo.com',true) RETURNING id;`);
      idValue = query.rows[0].id;
      await createToken(idValue);
      let userTokens = await getTokenByUserId(idValue);
      acToken = userTokens.access_token;

      // let safeValues = [idValue];
      // let SQL = (`select access_token from jwt where user_id=$1;`);
      // let query2 = await client.query(SQL,safeValues);
      // acToken = query2.rows[0].access_token;
      console.log('🚀 ~ file: user-profile.test.js ~ line 30 ~ beforeAll ~ acToken', acToken);

    // console.log('idValue: ', idValue);
    });

    afterAll(async()=>{
      await client.query(`DELETE FROM PROFILE WHERE first_name='melon';`);
      let safeValues = [idValue];
      let SQL = (`DELETE FROM JWT WHERE id=$1;`);
      await client.query(SQL,safeValues);
      await client.query(`DELETE FROM CLIENT WHERE user_name='melon';`);
      // await client.query(`TRUNCATE CLIENT RESTART IDENTITY;`);
      // await client.query(`TRUNCATE PROFILE RESTART IDENTITY;`);
      client.end();
    });

    it('will get all profiles', async ()=> {

      let response = await serverRequest.get('/api/v1/profile');

      expect(response.status).toEqual(200);
      expect(response.body.count).toEqual(2);
      expect(response.body.hasNext).toEqual(true);
      expect(response.body.results[0].first_name).toEqual('anwar');
      expect(response.body.results[0].last_name).toEqual('isleet');

    });

    it('will get profile information using id', async ()=> {
 
      let response = await serverRequest.get('/api/v1/profile/1');

      expect(response.status).toEqual(200);
      expect(response.body.caption).toEqual('artist');
      expect(response.body.id).toEqual(1);
      expect(response.body.first_name).toEqual('tamara');
      expect(response.body.last_name).toEqual('al-rashed');

    });

    it('will create a new profile', async ()=> {
      let test = {

        user_id: idValue,
        first_name: 'melon',
        last_name: 'watermelon',
        caption: 'artist',
        profile_picture: 2,

      };
      let response = await serverRequest.post('/api/v1/profile/').send(test);
      // console.log('response: ', response.body);
      expect(response.status).toEqual(201);
      expect(response.body.id).toEqual(idValue);
      expect(response.body.caption).toEqual('artist');
      expect(response.body.first_name).toEqual('melon');
      expect(response.body.last_name).toEqual('watermelon');

    });

    it('will edit a profile using id', async ()=> {

      let test = {
    
        first_name: 'melon',
        last_name: 'watermelon',
        caption: 'melon',
        profile_picture: 2,

      };
    
      let response = await serverRequest.put(`/api/v1/profile/${idValue}`).send(test);
      expect(response.status).toEqual(200);
      expect(response.body.id).toEqual(idValue);
      expect(response.body.caption).toEqual('melon');
      expect(response.body.first_name).toEqual('melon');
      expect(response.body.last_name).toEqual('watermelon');

    });

    it('will get user profile information using bearer authentication', async ()=> {

      req.headers = {
        authorization: `Bearer ${acToken}`,
      };

      let response = await serverRequest.get('/api/v1/me-profile/');

      // return middleware(req, res, next)
      //   .then(() => {
      //     expect(next).toHaveBeenCalledWith();
      //   });

      
      // let response = await serverRequest.get('/api/v1/me-profile/').send(`${acToken}`);
      // console.log('🚀 ~ file: user-profile.test.js ~ line 111 ~ it ~ response', response.body);

      expect(response.status).toEqual(200);
      // expect(response.body.caption).toEqual('melon');
      // expect(response.body.id).toEqual(idValue);
      // expect(response.body.first_name).toEqual('melon');
      // expect(response.body.last_name).toEqual('watermelon');

    });


  });

});