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


describe('Interaction endpoint', ()=> {


  let idValue;
  let idValue1;
  let profileId;
  let profileId1;
  let acToken;
  let acToken1;
  let postId;

  beforeAll(async()=>{

    await client.query(`
    INSERT INTO category(name,id) VALUES ('artist',1);
    INSERT INTO category(name,id) VALUES ('engneer',2);
    INSERT INTO category(name,id) VALUES ('desighner',3);`);

    let query2 = await client.query(`
    INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('amjad','8863','amjad@yahoo.com',true) RETURNING id;`);

    let query = await client.query(`
    INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('melon','mmm','watermelon@yahoo.com',true) RETURNING id;`);

    idValue = query.rows[0].id;
    idValue1 = query2.rows[0].id;

    await createToken(idValue1);
    await createToken(idValue);

    let userTokens = await getTokenByUserId(idValue);
    let userTokens1 = await getTokenByUserId(idValue);

    acToken = userTokens.access_token;
    acToken1 = userTokens1.access_token;

    let profileQuery = await client.query(`INSERT INTO profile(user_id,first_name,last_name,caption) VALUES ('${idValue}','melon','watermelon','artist') RETURNING id;`);
    let profileQuery1 = await client.query(`INSERT INTO profile(user_id,first_name,last_name,caption) VALUES ('${idValue1}','amjad','mesmar','designer') RETURNING id;`);

    profileId = profileQuery.rows[0].id;
    profileId1 = profileQuery1.rows[0].id;

    let  postQuery = await client.query(`INSERT INTO post(profile_id,category_id,text) VALUES ('${profileId}',1,'My first piece of art!') RETURNING id;`);
    postId = postQuery.rows[0].id;

  });

  afterAll(async()=>{
    await client.query(`
     DELETE FROM INTERACTION;
     DELETE FROM POST;
     DELETE FROM CATEGORY;
     DELETE FROM FOLLOW;
     DELETE FROM PROFILE;
     DELETE FROM JWT;
     DELETE FROM CLIENT;`);
    client.end();
  });


  it('Will add the interaction to the database', async ()=> {

    let test = {
      post_id: postId,
      post_type: 'like',
    };
    
    let response = await serverRequest.post('/api/v1/interaction').set(`Authorization`, `Bearer ${acToken1}`).send(test);

    expect(response.status).toEqual(201);
    expect(response.body[0].profile_id).toEqual(profileId);
    expect(response.body[0].post_id).toEqual(postId);
    expect(response.body[0].interaction_type).toEqual('like');

  });

  it('Will add the interaction to the database when use interact with their post', async ()=> {

    let test = {
      post_id: postId,
      post_type: 'like',
    };
    
    let response = await serverRequest.post('/api/v1/interaction').set(`Authorization`, `Bearer ${acToken}`).send(test);

    expect(response.status).toEqual(201);
    expect(response.body[0].profile_id).toEqual(profileId);
    expect(response.body[0].post_id).toEqual(postId);
    expect(response.body[0].interaction_type).toEqual('like');

  });


  it('Will give an error  when post id is wrong ', async ()=> {

    let test = {
      post_id: 12367812,
      post_type: 'like',
    };
    
    let response = await serverRequest.post('/api/v1/interaction').set(`Authorization`, `Bearer ${acToken1}`).send(test);

    expect(response.status).toEqual(500);
    expect(response.body.message).toEqual('error: invalid input syntax for type uuid: "12367812"');

  });


  it('Will give an error when no data sent ', async ()=> {

    let test = {
      post_id: postId,
      post_type: 'like',
    };
    
    let response = await serverRequest.post('/api/v1/interaction').set(`Authorization`, `Bearer ${acToken1}`);
    console.log('🚀 ~ file: interaction.test.js ~ line 133 ~ it ~ response', response.body);

    expect(response.status).toEqual(500);
    expect(response.body.message).toEqual('error: null value in column "post_id" of relation "interaction" violates not-null constraint');

  });


});

