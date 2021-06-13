'use strict';

require('dotenv').config();
process.env.TEST_MODE = true;
const  client  = require('../src/models/db');
(async ()=>{
  await client.connect();
})();
const { app } = require('../src/server');
const superTest = require('supertest');
const request = superTest(app);
// const {req,res,next} = require('express');


describe('messages tests', ()=>{
  afterAll(()=>{
    client.end();
  });
  it('should create message', async ()=>{
    
    let obj = {
      message: 'how are you?',
      receiver_id: 4,
      sender_id: 1, 
    };
    let res = await request.post('/api/v1/messages').send(obj);
          
    expect(res.status).toEqual(201);
    expect(res.body.message).toEqual(obj.message);
  });

  it('get all messages', async ()=>{
    
    let obj = {
      receiver_id: 4,
      sender_id: 1,
    };
    let res = await request.get('/api/v1/messages').send(obj);
    console.log(res.body);
          
    expect(res.status).toEqual(200);
    expect(res.body.results[0].message).toEqual('how are you?');
  });
  it('should update the message', async ()=>{
    let obj = {
      message: 'are you good?',
      id: 18,
    };

    let res = await request.put(`/api/v1/messages/${obj.id}`).send(obj);
    // console.log(res.body);
          
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('successful');
  });
  it('should delete the message', async ()=>{
    let obj = {
      message: 'are you good?',
      id: 18,
    };

    let res = await request.delete(`/api/v1/messages/${obj.id}`).send(obj);
    // console.log(res.body);
          
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('successful');
  });
});
