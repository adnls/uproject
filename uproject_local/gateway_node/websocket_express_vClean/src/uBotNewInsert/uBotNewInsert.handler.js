const express = require('express');
const router = express.Router();
const fs = require('fs');
var myEmitter = require("../../config/eventEmitter");


router.post('/', (req, res) => {
    console.log(req.body);
    let monJson = {
        phrase: "Vous m'envoyez un post sur uBotNewInsert : \n\n",
        data: "tout plein de data"
    }
    console.log("un post sur le / de la route uBotNewInsert")
    myEmitter.emit('uBotNewInsertEvent','uBotNewInsert', monJson);    
    res.send("un post sur le / de la route uBotNewInsert");
});


router.get('/', (req, res) => {
    console.log("un get sur le / de la route postTest");
    res.send("un get sur le / de la route postTest")    
});

module.exports = router;

//req["period"], ou req.period
