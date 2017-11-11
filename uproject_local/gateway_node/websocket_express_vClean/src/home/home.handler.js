const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', (req, res, next) => {
    let monJson = {
        phrase: "Vous m'envoyez un post : \n\n",
        data: req.body
    }
    //res.sendFile("../../front_part/index.html");
    res.send('post sur le home')
    next();
});

router.get('/', (req, res) => {
    //res.sendFile("../../front_part/index.html");    
    //let index = fs.readFileSync('../../front-part/index.html');
    console.log("Bonjour vous etes sur le home")
    res.send("get sur le home");
    //res.sendFile("../../front_part/index.html");    
    //res.render("../../front_part/index.html");
});

module.exports = router;