'use strict';

require('dotenv').config();
process.env.TEST_MODE = true;
const  client  = require('../src/models/db');
(async ()=>{
  await client.connect();
})();

const server = require('../src/server');
const superTest = require ('supertest');
const serverRequest = superTest(server.app);

describe('follow endpoint', ()=> {

  afterAll(()=>{
    client.end();
  });

  it('Will insert or update the follow data', async ()=> {
    let test = {
      follower: '1',
      following: '2',
    };
    
    let response = await serverRequest.post('/api/v1/follow').send(test);

    expect(response.status).toEqual(201);
    expect(response.body[0].follower).toEqual(1);
    expect(response.body[0].following).toEqual(2);

  });

});