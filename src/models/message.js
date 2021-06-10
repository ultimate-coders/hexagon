const client = require('./db');

const PAGE_SIZE = 10;
let createMessage = async (message , senderId, receiverId)=>{
  let SQL = `INSERT INTO message message=$1, sender_id=$2, receiver=$3;`;
  let safeValues = [message,senderId,receiverId];
  let result = await client.query(SQL, safeValues);
  return result;
};
let getMessage = async (senderId , receiverId, pageNumber = 1) =>{
  try {
    let SQL = `SELECT DISTINCT * FROM message WHERE sender_id=$1 AND receiver_id=$2 OR sender_id=$2 AND receiver_id=$1 ORDER BY id DESC LIMIT=$3 OFFSET=$4;`;
    let safeValues = [ senderId,receiverId, pageNumber, pageNumber * PAGE_SIZE ];
    let result = await client.query(SQL, safeValues);
    return result;
  } catch (error) {
    console.log(error.message);
  }   
};

let deleteMessage = async (id) =>{
  try {
    let SQL = `DELETE FROM message WHERE id=$1;`;
    let safeValue = [id];
    let result = client.query(SQL, safeValue);
    return result;
  } catch (error) {
    console.log(error.message);

  }
};

let updateMessage =  async (message, id) =>{
  try {
    let SQL = `UPDATE message SET message=$1 WHERE id=$2;`;
    let safeValues = [message, id];
    let result = client.query(SQL, safeValues);
    return result;
  } catch (error) {
    console.log(error.message);
  }  
};

module.exports = {
  createMessage,
  getMessage,
  deleteMessage,
  updateMessage,
};



