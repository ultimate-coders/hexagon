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


describe('notifications test', ()=>{
  afterAll(()=>{
    client.end();
  });
  it('should return notification message', async ()=>{
    
    let obj = {
         
      message: 'he liked your post',
      receiver_id: 4,
      post_Id: 1,
          
    };
    let res = await request.post('/api/v1/notifications').send(obj);
          
    expect(res.status).toEqual(201);
    expect(res.body).toEqual(obj.message);
  });

  it('should get all notifications', async ()=>{
    
    let obj = {
      receiver_id: 4,
    };
    let res = await request.get('/api/v1/notifications').send(obj);
          
    expect(res.status).toEqual(200);
    expect(res.body.results[0].message).toEqual('he liked your post');
  });
  it('should update notification', async ()=>{
    
    let res = await request.put('/api/v1/notifications/15');
   
          
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('successful');
  });

});


