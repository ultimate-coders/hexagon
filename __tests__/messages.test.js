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

let users = {
  first: { user_name: 'admin', email: 'admin@yahoo.com',  password: 'Password1@' },
  second: { user_name: 'writer', email: 'writer@yahoo.com',  password: 'Password1@' },
};

describe('messages tests', ()=>{
  let id1;
  let id2;
  let accessToken;
  beforeAll( async () => {
  
    client.query(`DROP TABLE IF EXISTS follow;
      DROP TABLE IF EXISTS jwt;
      
      DROP TABLE IF EXISTS message;
      
      DROP TABLE IF EXISTS comment;
      DROP TABLE IF EXISTS attachment;
      
      DROP TABLE IF EXISTS post;
      DROP TABLE IF EXISTS notification;
      DROP TABLE IF EXISTS profile;
      
      DROP TABLE IF EXISTS user_file;
      DROP TABLE IF EXISTS category;
      
      
      DROP TABLE IF EXISTS client;
      
      CREATE TABLE client(
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(100) NOT NULL UNIQUE,
        hashed_password VARCHAR(250) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        google_id VARCHAR(200) UNIQUE,
        verified boolean DEFAULT false
      );
      
      CREATE TABLE jwt(
        id SERIAL PRIMARY KEY,
        user_id int NOT NULL UNIQUE,
        access_token VARCHAR(250) NOT NULL,
        refresh_token VARCHAR(250) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES client(id)
      );
      
      CREATE TABLE user_file(
        id SERIAL PRIMARY KEY,
        file text NOT NULL,
        created_at date not null default current_timestamp
      );
      
      CREATE TABLE profile(
        id SERIAL PRIMARY KEY,
        user_id int NOT NULL UNIQUE,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        caption VARCHAR(250),
        profile_picture int,
      
        FOREIGN KEY (user_id) REFERENCES client(id),
        FOREIGN KEY (profile_picture) REFERENCES user_file(id)
      );
      
      CREATE TABLE follow(
        id SERIAL PRIMARY KEY,
        follower int NOT NULL,
        following int NOT NULL,
      
        FOREIGN KEY (follower) REFERENCES profile(id),
        FOREIGN KEY (following) REFERENCES profile(id)
      );
      
      CREATE TABLE message(
        id SERIAL PRIMARY KEY,
        sender_id int NOT NULL,
        receiver_id int NOT NULL,
        message text NOT NULL ,
        seen boolean DEFAULT false,
        
        FOREIGN KEY (sender_id) REFERENCES profile(id),
        FOREIGN KEY (receiver_id) REFERENCES profile(id)
      );
      
      CREATE TABLE category(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20) NOT NULL UNIQUE
      );
      
      
      CREATE TABLE post(
        id SERIAL PRIMARY KEY,
        profile_id int NOT NULL,
        category_id int NOT NULL,
        text text NOT NULL,
      
        FOREIGN KEY (profile_id) REFERENCES profile(id),
        FOREIGN KEY (category_id) REFERENCES category(id)
      );
      
      CREATE TABLE attachment(
        id SERIAL PRIMARY KEY,
        post_id int NOT NULL,
        file_id int NOT NULL
      );
      
      CREATE TABLE comment(
          id SERIAL PRIMARY KEY,
          comment text NOT NULL,
          post_id int NOT NULL,
          profile_id int NOT NULL
      );
      
      CREATE TABLE notification(
        id SERIAL PRIMARY KEY,
        receiver_id int NOT NULL,
        message text NOT NULL,
        post_id int,
        seen boolean DEFAULT false,
      
        FOREIGN KEY (receiver_id) REFERENCES profile(id)
      );
      
      DROP TABLE IF EXISTS interaction;
      CREATE TABLE interaction( 
          id SERIAL PRIMARY KEY,   
          profile_id int ,
          post_id int NOT NULL,
          interaction_type VARCHAR(20) DEFAULT 'like'
      );`);

    let SQL = `INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('tamara','sss','tamara@yahoo.com',true) RETURNING *;`;
    let SQL2 = `INSERT INTO profile(user_id,first_name,last_name,caption) VALUES ($1,'tamara','al-rashed','artist');`;
    
    await request.post('/auth/signup').send(users.first);
    let result2 = await request.post('/auth/signin').set('Authorization', `Basic YWRtaW5AeWFob28uY29tOlBhc3N3b3JkMUA=`);
    
    let result1 = await client.query(SQL);
    
    id1 = result1.rows[0].id;
    await client.query(SQL2, [id1]);
    
    accessToken = result2.body.access_token;
    
  });
  afterAll(()=>{
    client.end();
  });
  it('should create message', async ()=>{
    
    let obj = {
      message: 'how are you?',
      receiver_id: id1, 
    };
    let res = await request.post('/api/v1/messages').set('Authorization', `Bearer ${accessToken}`).send(obj);
          
    expect(res.status).toEqual(201);
  });

  it('get all messages', async ()=>{
    
    let obj = {
      receiver_id: 4,
      sender_id: 1,
    };
    let res = await request.get('/api/v1/messages').set('Authorization', `Bearer ${accessToken}`).send(obj);
          
    expect(res.status).toEqual(200);
  });
  it('should update the message', async ()=>{
    let obj = {
      message: 'are you good?',
      id: 1,
    };

    let res = await request.put(`/api/v1/messages/${obj.id}`).set('Authorization', `Bearer ${accessToken}`).send(obj);
          
    expect(res.status).toEqual(200);
  });
  it('should delete the message', async ()=>{
    let obj = {
      id: 1,
    };

    let res = await request.delete(`/api/v1/messages/${obj.id}`).set('Authorization', `Bearer ${accessToken}`).send(obj);
          
    expect(res.status).toEqual(200);
  });
});
