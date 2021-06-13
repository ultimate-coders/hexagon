'use strict';
const Client = require('./db');

//follower : who following me
//following : who i follow

async function followHndler(data){
  try{
    let SQL=`select * from follow where follower = $1 and following=$2;`;
    let safeValues=[data.follower,data.following];
    let query= await Client.query(SQL, safeValues);
    if(query.rows.length===0) {
      let SQL=`INSERT INTO follow (follower,following) VALUES ($1,$2) returning * ;`;
      let safeValues=[data.follower,data.following];
      let result = await Client.query(SQL, safeValues);
      return result.rows;
    }else{
      let SQL=`delete from follow where follower=$1 AND following=$2 returning *;`;
      let safeValues=[data.follower,data.following];
      let result = await Client.query(SQL, safeValues);
      return result.rows;
    }
  }catch(e){
    throw new Error(e);
  }
}

module.exports= followHndler;
