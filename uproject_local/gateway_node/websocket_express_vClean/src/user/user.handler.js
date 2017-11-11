const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    let monJson = {
        phrase: "Vous m'envoyez un post sur le user: \n\n",
        data: req.body
    }
    res.json(monJson);
});

router.get('/', (req, res) => {
    res.send("Bonjour vous etes sur le home de user handler");
});

module.exports = router;