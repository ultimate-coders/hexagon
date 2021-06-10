const express = require('express');
const router = express.Router();

router.get('/test', (req,res)=>{
  res.send('working well');
});
module.exports = router;