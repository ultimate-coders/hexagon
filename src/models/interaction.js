'use strict';
const Client = require('./db');
const { uuid } = require('uuid').v4;

async function addORdeleteInteraction(data){
  try{
    let SQL=`select * from interaction where profile_id=$1 AND post_id=$2;`;
    let safeValues=[data.user.profile_id,data.body.post_id];
    let query= await Client.query(SQL, safeValues);
    if(query.rows.length===0) {
      let id = uuid();

      if(data.body.type){
        let SQL=`INSERT INTO interaction (id,profile_id,post_id) VALUES ($1,$2) returning * ;`;
        let safeValues=[id,data.user.profile_id,data.body.post_id];
        let result = await Client.query(SQL, safeValues);
        return result.rows;}
      else{
        let SQL=`INSERT INTO interaction (id,profile_id,post_id,interaction_type) VALUES ($1,$2,$3) returning * ;`;
        let safeValues=[id,data.user.profile_id,data.body.post_id,data.body.type];
        let result = await Client.query(SQL, safeValues);
        return result.rows;
      }
    }else{
      let SQL=`delete from interaction where profile_id=$1 AND post_id=$2 returning *;`;
      let safeValues=[data.user.profile_id,data.body.post_id];
      let result = await Client.query(SQL, safeValues);
      return result.rows;
    }
  }catch(e){
    throw new Error(e);
  }
}

//select count(interaction_type) from interaction where interaction_type in ('like','love','angry','laugh') and post_id = 5;

//select * from interaction ou where (select count(*) from interaction inr where inr.interaction_type = ou.interaction_type) > 1

// select post_id, interaction_type, count(*) from interaction group by post_id, interaction_type HAVING count(*) > 1

module.exports={addORdeleteInteraction} ;