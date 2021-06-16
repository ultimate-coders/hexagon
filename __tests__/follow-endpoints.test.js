'use strict';

require('dotenv').config();
process.env.TEST_MODE = true;
const {createToken,getTokenByUserId} = require('../src/auth/models/jwt');
const  client  = require('../src/models/db');

(async ()=>{
  await client.connect();
})();

const server = require('../src/server');
const superTest = require ('supertest');
const serverRequest = superTest(server.app);


describe('follow endpoint', ()=> {

  // beforeEach(function (done) {
  //   setTimeout(function(){
  //     done();
  //   }, 1000);
  // });

  // jest.useFakeTimers();


  // afterEach(function (done) {
  //   setTimeout(function(){
  //     done();
  //   }, 1000);
  // });

  let idValue;
  let idValue1;
  let profileID;
  let profileID1;
  let acToken;

  beforeAll(async()=>{

    let query2 = await client.query(`
    INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('amjad','8863','amjad@yahoo.com',true) RETURNING id;`);

    let query = await client.query(`
    INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('melon','mmm','watermelon@yahoo.com',true) RETURNING id;`);

    idValue = query.rows[0].id;
    idValue1 = query2.rows[0].id;

    await createToken(idValue1);
    await createToken(idValue);

    let userTokens = await getTokenByUserId(idValue);
    acToken = userTokens.access_token;

    let profileQuery = await client.query(`INSERT INTO profile(user_id,first_name,last_name,caption) VALUES ('${idValue}','melon','watermelon','artist') RETURNING id;`);
    let profileQuery1 = await client.query(`INSERT INTO profile(user_id,first_name,last_name,caption) VALUES ('${idValue1}','amjad','mesmar','designer') RETURNING id;`);

    profileID = profileQuery.rows[0].id;
    profileID1 = profileQuery1.rows[0].id;

  });

  afterAll(async()=>{
    await client.query(`
    DELETE FROM FOLLOW;
     DELETE FROM PROFILE;
     DELETE FROM JWT;
     DELETE FROM CLIENT;`);
    client.end();
  });


  it('Will insert or update the follow data', async ()=> {
    let test = {
      follower: profileID,
      following: profileID1,
    };
    
    let response = await serverRequest.post('/api/v1/follow').set(`Authorization`, `Bearer ${acToken}`).send(test);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('Successfully updated');

  });

});

