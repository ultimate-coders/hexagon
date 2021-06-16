'use strict';

require('dotenv').config();
process.env.TEST_MODE = true;
process.env.DATABASE_URL_TEST = process.env.DATABASE_URL_TEST2;

const  client  = require('../../src/models/db');
(async ()=>{
  await client.connect();
})();
const { app } = require('../../src/server');
const superTest = require('supertest');
const request = superTest(app);
// const {req,res,next} = require('express');
let users = {
  first: { user_name: 'admin', email: 'admin@yahoo.com',  password: 'Password1@' },
  second: { user_name: 'writer', email: 'writer@yahoo.com',  password: 'Password1@' },
};


describe('messages tests', ()=>{
  let id1;
  let id2;
  let accessToken;
  beforeAll(async()=>{
    await request.post('/auth/signup').send(users.first);
    let result2 = await request.post('/auth/signin').set('Authorization', `Basic YWRtaW5AeWFob28uY29tOlBhc3N3b3JkMUA=`);
    accessToken = result2.body.access_token;
    let re = await request.get('/api/v1/me-profile').set('Authorization', `Bearer ${accessToken}`);
    id1=re.body.id;
  });
  afterAll(()=>{
    client.end();
  });
  it('should create message', async ()=>{
    
    let obj = {
      message: 'how are you?',
      receiver_id: 'c5c96575-6413-4d77-b00b-cb3c68d3a425',
      sender_id: id1, 
    };
    let res = await request.post('/api/v1/messages').set('Authorization', `Bearer ${accessToken}`).send(obj);
    // console.log('🚀 ~ file: messages.test.js ~ line 41 ~ it ~ res', res.body);
    id2 = res.body.id;
    expect(res.status).toEqual(201);
    expect(res.body.message).toEqual('message successfully sent');
  });

  it('get all messages', async ()=>{
    
    let obj = {
      receiver_id: 'c5c96575-6413-4d77-b00b-cb3c68d3a425',
    };
    let res = await request.get('/api/v1/messages').set('Authorization', `Bearer ${accessToken}`).send(obj);
          
    expect(res.status).toEqual(200);
    expect(res.body.results[0].message).toEqual('how are you?');
  });
  it('should update the message', async ()=>{
    let obj = {
      message: 'are you good?',
    };

    let res = await request.put(`/api/v1/messages/${id2}`).set('Authorization', `Bearer ${accessToken}`).send(obj);
          
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('successfully updated');
  });
  it('should delete the message', async ()=>{
    // let obj = {
    //   message: 'are you good?',
    //   id: 3,
    // };

    let res = await request.delete(`/api/v1/messages/${id2}`).set('Authorization', `Bearer ${accessToken}`);
          
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('successfully deleted');
  });
});
