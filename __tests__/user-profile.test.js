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

describe('user profile endpints',()=> {
  
  beforeAll(()=>{
    client.query(`INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('melon','mmm','watermelon@yahoo.com',true);`);
  });

  afterAll(async()=>{
    await client.query(`DELETE FROM PROFILE WHERE first_name='melon';`);
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

  // DON'T DELETE THIS!

  // it('will get user profile information', async ()=> {
  //   let test = {
  //     id: 1,
  //     first_name: 'tamara',
  //     last_name: 'al-rashed',
  //     caption: 'artist',
  //     profile_picture: {
  //       id: 1,
  //       link: '../img/female.jpg',
  //     },
  //     user: {
  //       id: 1,
  //       username: 'tamara',
  //       email: 'tamara@yahoo.com',
  //     },
  //   };
    
  //   let response = await serverRequest.get('/api/v1/me-profile/').send(test);
  //   expect(response.status).toEqual(200);
  //   expect(response.body.caption).toEqual('artist');
  //   expect(response.body.id).toEqual(1);
  //   expect(response.body.first_name).toEqual('tamara');
  //   expect(response.body.last_name).toEqual('al-rashed');

  // });

  it('will create a new profile', async ()=> {
    let test = {

      user_id: 6,
      first_name: 'melon',
      last_name: 'watermelon',
      caption: 'artist',
      profile_picture: 2,

    };
    
    let response = await serverRequest.post('/api/v1/profile/').send(test);
    expect(response.status).toEqual(201);
    expect(response.body.caption).toEqual('artist');
    expect(response.body.first_name).toEqual('melon');
    expect(response.body.last_name).toEqual('watermelon');

  });

  it('will edit a profile using id', async ()=> {
    let test = {

      id: 6,
      first_name: 'melon',
      last_name: 'watermelon',
      caption: 'melon',
      profile_picture: 2,

    };
    
    let response = await serverRequest.put('/api/v1/profile/6').send(test);
    expect(response.status).toEqual(200);
    expect(response.body.caption).toEqual('melon');
    expect(response.body.first_name).toEqual('melon');
    expect(response.body.last_name).toEqual('watermelon');

  });

});