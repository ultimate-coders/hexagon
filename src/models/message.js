const client = require('./db');

const PAGE_SIZE = 10;


let createMessage = async (message , senderId, receiverId)=>{
  let SQL = `INSERT INTO message (message,sender_id,reciver_id) VALUES ($1,$2,$3) RETURNING *;`;
  let safeValues = [message,senderId,receiverId];
  let result = await client.query(SQL, safeValues);
  return result;
};
let getMessage = async (senderId , receiverId, pageNumber = 1) =>{
  try {
    let startFrom = (pageNumber - 1) * PAGE_SIZE;
    let SQL = `SELECT DISTINCT * FROM message WHERE (sender_id=$1 AND reciver_id=$2) OR (sender_id=$2 AND reciver_id=$1) ORDER BY id DESC LIMIT $3 OFFSET $4;`;
    let safeValues = [ senderId,receiverId, PAGE_SIZE, startFrom];
    let result = await client.query(SQL, safeValues);
    console.log(result, safeValues);
    return result.rows;
  } catch (error) {
    throw new Error(error);
  }   
};

let deleteMessage = async (id) =>{
  try {
    let SQL = `DELETE FROM message WHERE id=$1;`;
    let safeValue = [id];
    let result = client.query(SQL, safeValue);
    return result;
  } catch (error) {
    throw new Error(error);

  }
};

let updateMessage =  async (message, id) =>{
  try {
    let SQL = `UPDATE message SET message=$1 WHERE id=$2;`;
    let safeValues = [message, id];
    let result = client.query(SQL, safeValues);
    return result;
  } catch (error) {
    throw new Error(error);
  }  
};

module.exports = {
  createMessage,
  getMessage,
  deleteMessage,
  updateMessage,
};



