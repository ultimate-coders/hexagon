'use strict';
require('dotenv').config();
process.env.TEST_MODE = true;
process.env.DATABASE_URL_TEST = process.env.DATABASE_URL_TEST2;
const  client  = require('../src/models/db');
(async ()=>{
  await client.connect();
})();
const { app } = require('../src/server');
const superTest = require('supertest');
// const { expect } = require('chai');
const request = superTest(app);

let users = {
  first: { user_name: 'admin', email: 'admin@yahoo.com',  password: 'Password1@' },
  second: { user_name: 'writer', email: 'writer@yahoo.com',  password: 'Password1@' },
};

describe('verification test', ()=>{
  let accessToken;
  let code;
  beforeAll(async()=>{
    await request.post('/auth/signup').send(users.first);
    let result2 = await request.post('/auth/signin').set('Authorization', `Basic YWRtaW5AeWFob28uY29tOlBhc3N3b3JkMUA=`);
    accessToken = result2.body.access_token;
  });
  afterAll(()=>{
    client.end();
  });
  it('should send a verification code', async()=>{
      
    let res = await request.post('/auth/user/verification').set('Authorization', `Bearer ${accessToken}`);
  });
});