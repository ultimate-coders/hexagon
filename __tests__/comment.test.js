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
const request = superTest(app);

let users = {
  first: { user_name: 'admin', email: 'admin@yahoo.com',  password: 'Password1@' },
  second: { user_name: 'writer', email: 'writer@yahoo.com',  password: 'Password1@' },
};

let accessToken;
describe('comments tests', ()=>{
  let id1;
  let id2;
  let id3;
  beforeAll(async()=>{
    await request.post('/auth/signup').send(users.first);
    let result2 = await request.post('/auth/signin').set('Authorization', `Basic YWRtaW5AeWFob28uY29tOlBhc3N3b3JkMUA=`);
    accessToken = result2.body.access_token;
    let re = await request.get('/api/v1/me-profile').set('Authorization', `Bearer ${accessToken}`);
    let SQL = `INSERT INTO post(profile_id,category_id,text) VALUES ($1,1,'rrrrr') RETURNING *;`;  
    let safeValue = [re.body.id];
    let result = await client.query(SQL, safeValue);
    id1 = result.rows[0].id;
    console.log('🚀 ~ file: comment.test.js ~ line 34 ~ beforeAll ~ id1', id1);
    id2 = result.rows[0].profile_id;
    console.log('🚀 ~ file: comment.test.js ~ line 36 ~ beforeAll ~ id2', id2);
    // id3 = re.body.id;
  });
  afterAll(()=>{
    client.end();
  });
  it('should get all comments ', async ()=>{
    
    let res = await request.get(`/api/v1/comment/${id1}`).set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toEqual(201);
  });

  it('should create a comment', async ()=>{
    
    let obj = {
      comment: 'hello',
      post_id: id1,
    };
    let res = await request.post('/api/v1/comment').set('Authorization', `Bearer ${accessToken}`).send(obj);
    id3 = res.body.id;   
    expect(res.status).toEqual(201);
    // expect(res.body.results[0].message).toEqual('how are you?');
  });
  it('should update the comment', async ()=>{
    let obj = {
      comment: 'nice',
    };

    let res = await request.put(`/api/v1/comment/${id3}`).set('Authorization', `Bearer ${accessToken}`).send(obj);
          
    expect(res.status).toEqual(201);
  });
  it('should delete the message', async ()=>{
   
    let res = await request.delete(`/api/v1/comment/${id3}`).set('Authorization', `Bearer ${accessToken}`);
          
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('Successfully deleted');
  });
  it('should not get all comments ', async ()=>{
    
    let res = await request.get(`/api/v1/comment/id1`).set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toEqual(500);
  });
  it('should create a comment', async ()=>{
    
    let obj = {
      comment: 'hello',
      post_id: 'id1',
    };
    let res = await request.post('/api/v1/comment').set('Authorization', `Bearer ${accessToken}`).send(obj);
    id3 = res.body.id;   
    expect(res.status).toEqual(500);
  });
});


// describe('messages tests', ()=>{
//   let id1;
//   let id2;
//   beforeAll(async()=>{
//     // await request.post('/auth/signup').send(users.first);
//     // let result2 = await request.post('/auth/signin').set('Authorization', `Basic YWRtaW5AeWFob28uY29tOlBhc3N3b3JkMUA=`);
//     // accessToken = result2.body.access_token;
//     let re = await request.get('/api/v1/me-profile').set('Authorization', `Bearer ${accessToken}`);
//     id1=re.body.id;
//     let obj = {
//       message: 'how are you?',
//       receiver_id: 'c5c96575-6413-4d77-b00b-cb3c68d3a425',
//       sender_id: id1, 
//     };
//     let res = await request.post('/api/v1/messages').set('Authorization', `Bearer ${accessToken}`).send(obj);
//     id2 = res.body.id;
//   });
//   afterAll(()=>{
//     client.end();
//   });

//   it('get all messages', async ()=>{
    
//     let obj = {
//       receiver_id: '425',
//     };
//     let res = await request.get('/api/v1/messages').set('Authorization', `Bearer ${accessToken}`).send(obj);
          
//     expect(res.status).toEqual(500);
//     expect(res.body.message).toEqual('error: invalid input syntax for type uuid: \"425\"');
//   });
//   it('should update the message', async ()=>{
//     let obj = {
//       message: 'are you good?',
//     };

//     let res = await request.put(`/api/v1/messages/id2`).set('Authorization', `Bearer ${accessToken}`);
          
//     expect(res.status).toEqual(500);
//     expect(res.body.message).toEqual('invalid input syntax for type uuid: \"id2\"');
//   });
//   it('should delete the message', async ()=>{
    

//     let res = await request.delete(`/api/v1/messages/id2`).set('Authorization', `Bearer ${accessToken}`);
          
//     expect(res.status).toEqual(500);
//     expect(res.body.message).toEqual('invalid input syntax for type uuid: \"id2\"');
//   });
// });



