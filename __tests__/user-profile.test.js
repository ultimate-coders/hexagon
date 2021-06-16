/* eslint-disable no-undef */
'use strict';

require('dotenv').config();
process.env.TEST_MODE = true;
const  client  = require('../src/models/db');
const {createToken,getTokenByUserId} = require('../src/auth/models/jwt');

(async ()=>{
  await client.connect();
})();


const server = require('../src/server');
const superTest = require ('supertest');
const serverRequest = superTest(server.app);


describe('user profile endpints',()=> {

  // beforeEach(function (done) {
  //   setTimeout(function(){
  //     done();
  //   }, 500);
  // });

  // jest.useFakeTimers();


  // afterEach(function (done) {
  //   setTimeout(function(){
  //     done();
  //   }, 500);
  // });

  let idValue;
  let profileID;
  let acToken;

  beforeAll(async()=>{

    let query = await client.query(`INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('melon','mmm','watermelon@yahoo.com',true) RETURNING id;`);
    idValue = query.rows[0].id;
    await createToken(idValue);
    let userTokens = await getTokenByUserId(idValue);
    acToken = userTokens.access_token;
    let profileQuery = await client.query(`INSERT INTO profile(user_id,first_name,last_name,caption) VALUES ('${idValue}','melon','watermelon','artist') RETURNING id;`);
    profileID = profileQuery.rows[0].id;
  });

  afterAll(async()=>{

    await client.query(`
     DELETE FROM FOLLOW;
     DELETE FROM PROFILE;
     DELETE FROM JWT;
     DELETE FROM CLIENT;`);

    client.end();
  });

  it('will get all profiles', async ()=> {

    let response = await serverRequest.get('/api/v1/profile').set(`Authorization`, `Bearer ${acToken}`);

    expect(response.status).toEqual(200);
    expect(response.body.count).toEqual(1);
    expect(response.body.hasNext).toEqual(false);
    expect(response.body.results[0].first_name).toEqual('melon');
    expect(response.body.results[0].last_name).toEqual('watermelon');

  });

  it('will get profile information using id', async ()=> {
 
    let response = await serverRequest.get(`/api/v1/profile/${profileID}`).set(`Authorization`, `Bearer ${acToken}`);

    expect(response.status).toEqual(200);
    expect(response.body.caption).toEqual('artist');
    expect(response.body.id).toEqual(profileID);
    expect(response.body.first_name).toEqual('melon');
    expect(response.body.last_name).toEqual('watermelon');

  });
  it('will edit a profile using bearer authentication', async ()=> {

    let test = {
    
      first_name: 'melon',
      last_name: 'watermelon',
      caption: 'melon',

    };
    
    let response = await serverRequest.put(`/api/v1/profile/`).set(`Authorization`, `Bearer ${acToken}`).send(test);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(profileID);
    expect(response.body.caption).toEqual('melon');
    expect(response.body.first_name).toEqual('melon');
    expect(response.body.last_name).toEqual('watermelon');

  });

  it('will get user profile information using bearer authentication', async ()=> {


    let response = await serverRequest.get('/api/v1/me-profile').set(`Authorization`, `Bearer ${acToken}`);

      
    expect(response.status).toEqual(200);
    expect(response.body.caption).toEqual('melon');
    expect(response.body.id).toEqual(profileID);
    expect(response.body.first_name).toEqual('melon');
    expect(response.body.last_name).toEqual('watermelon');

  });


});
