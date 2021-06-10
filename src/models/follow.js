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
      let SQL=`INSERT INTO follow (follower,following) VALUES ($1,$2);`;
      let safeValues=[data.follower,data.following];
      await Client.query(SQL, safeValues);
    }else{
      let SQL=`delete from follow where follower=$1 AND following=$2;`;
      let safeValues=[data.follower,data.following];
      await Client.query(SQL, safeValues);
    }
  }catch(e){
    throw new Error(e);
  }
}

module.exports= followHndler;
