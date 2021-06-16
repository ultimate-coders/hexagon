/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

require('dotenv').config();
process.env.TEST_MODE = true;
const  client  = require('../src/models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {createToken,getTokenByUserId} = require('../src/auth/models/jwt');
const {authenticateWithToken,authenticateBasic,getToken} = require('../src/auth/models/helpers');
const {validateEmail,validatePassword,checkPassword} = require('../src/auth/controllers/helpers');
const {sendNotification,sendMessage} = require('../src/utils/helpers');
const {getUserById} = require('../src/auth/models/user');

const server = require('../src/server');
const superTest = require ('supertest');
const serverRequest = superTest(server.app);

(async ()=>{
  await client.connect();
})();


describe('Helpers Tests', () => {


  let idValue;
  let idValue1;
  let profileId;
  let profileId1;
  let acToken;
  let acToken1;
  let postId;
  let userEmail;
  let userPassword;

  beforeAll(async()=>{
    await client.query(`
      INSERT INTO category(name,id) VALUES ('artist',1);
      INSERT INTO category(name,id) VALUES ('engneer',2);
      INSERT INTO category(name,id) VALUES ('desighner',3);`);

    let query2 = await client.query(`
      INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('amjad','8863','amjad@yahoo.com',true) RETURNING id;`);
    
    let password = await bcrypt.hash('123', 10);

    let query = await client.query(`
      INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('melon','${password}','watermelon@yahoo.com',true) RETURNING *;`);


    idValue = query.rows[0].id;
    idValue1 = query2.rows[0].id;
    userEmail = query.rows[0].email;
    userPassword = query.rows[0].hashed_password;
      
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
      DELETE FROM MESSAGE;
      DELETE FROM NOTIFICATION;
      DELETE FROM INTERACTION;
      DELETE FROM POST;
      DELETE FROM CATEGORY;
      DELETE FROM FOLLOW;
      DELETE FROM PROFILE;
      DELETE FROM JWT;
      DELETE FROM CLIENT;`);
    client.end();
  });

  it(('authenticateBasic Helper test'), async ()=> {
    const testFun = jest.fn(authenticateBasic);
    let testValue = await testFun(userEmail,'123');

        
    expect(testValue.id).toEqual(idValue);
    expect(testValue.user_name).toEqual('melon');
    expect(testValue.hashed_password).toEqual(userPassword);
    expect(testValue.email).toEqual('watermelon@yahoo.com');
    expect(testValue.google_id).toEqual(null);
    expect(testValue.verified).toEqual(true);

  });

  it('AuthenticateWithToken Helper test', async ()=> {
    const testFun = jest.fn(authenticateWithToken);
    let testToken = 'badToken';
    let testValue = await testFun(acToken);
      
    expect(testValue.id).toEqual(idValue);
  });

  it('getToken Helper test', async ()=> {

    let test1 = await getToken(idValue);
    let test2 = await getToken(idValue,'refresh');
    let test3 = await getToken(idValue,'badToken');

    const parsedToken1 = jwt.verify(test1, process.env.SECRET); //verify token
    const parsedToken2 = jwt.verify(test2, process.env.SECRET); //verify token


           
    expect(parsedToken1.userId).toEqual(idValue);
    expect(parsedToken1.token_type).toEqual('access');


    expect(parsedToken2.userId).toEqual(idValue);
    expect(parsedToken2.token_type).toEqual('refresh');

  });


  it('validateEmail Helper test', async ()=> {

    let test1 = await validateEmail('Amjad@gmail.com');
    let test2 = await validateEmail('Amjad.com');

  
    expect(test1).toEqual(true);


    expect(test2).toEqual(false);


  });

  it('validatePassword Helper test', async ()=> {

    let test1 = await validatePassword('Ax@123');
    let test2 = await validatePassword('123');

  
    expect(test1).toEqual(true);


    expect(test2).toEqual(false);


  });

  it('checkPassword Helper test', async ()=> {


    let test1 = await checkPassword('123',userPassword);
    let test2 = await checkPassword('1234',userPassword);
    let test3 = await checkPassword('123','123124');


  
    expect(test1).toEqual(true);
    expect(test2).toEqual(false);
    expect(test3).toEqual(false);

  });

  it('sendNotification Helper test', async ()=> {

    const testFun = jest.fn(sendNotification);
    let test1 = await testFun('Hi',profileId,postId);
  });

  it('sendMessage Helper test', async ()=> {

    const testFun = jest.fn(sendMessage);
    let test1 = await testFun('Hi',profileId,profileId1);
    
  });
  
});