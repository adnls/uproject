const express = require('express');
const router = express.Router();
const fs = require('fs');
var myEmitter = require("../../config/eventEmitter");

router.post('/', (req, res) => {
    var data = req.body;
    console.log(data); 
    myEmitter.emit('microserviceSendMessage','postTest', data);    
    res.send("un post sur le / de la route postTest");
});


router.get('/', (req, res) => {
    console.log("un get sur le / de la route postTest");
    res.send("un get sur le / de la route postTest")    
});

module.exports = router;