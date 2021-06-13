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

describe('user profile endpints', ()=> {

  afterAll(()=>{
    client.end();
  });

  it('will get all profiles', async ()=> {
    // let test = {
    //   follower: '1',
    //   following: '2',
    // };
    
    let response = await serverRequest.get('/api/v1/profile');

    expect(response.status).toEqual(200);
    expect(response.body.count).toEqual(2);
    expect(response.body.hasNext).toEqual(true);
    expect(response.body.results[0].first_name).toEqual('anwar');
    expect(response.body.results[0].last_name).toEqual('isleet');

  });

  it('will get profile information using id', async ()=> {
    // let test = {
    //   'id': 1,
    //   'first_name': 'tamara',
    //   'last_name': 'al-rashed',
    //   'caption': 'artist',
    //   'profile_picture': {
    //     'id': 1,
    //     'link': '../img/female.jpg',
    //   },
    //   'user': {
    //     'id': 1,
    //     'username': 'tamara',
    //     'email': 'tamara@yahoo.com',
    //   },
    // };
    
    let response = await serverRequest.get('/api/v1/profile/1');

    expect(response.status).toEqual(200);
    console.log('test ', response.body);
    expect(response.body.caption).toEqual('artist');
    expect(response.body.id).toEqual(1);
    expect(response.body.first_name).toEqual('tamara');
    expect(response.body.last_name).toEqual('al-rashed');

  });

});