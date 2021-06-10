'use strict';

//follower : who following me
//following : who i follow
function followHndler(data){
  let SQL=`select * from follow where follower = $1 and following=$2;`;
  let safeValues=[data.follower,data.following];
  let query=Client.query(SQL, safeValues).then(data => {
    console.log(!(data.rows.length));
}