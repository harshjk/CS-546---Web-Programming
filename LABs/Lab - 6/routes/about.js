/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Jul 03 2017
 *  File : about.js
 *******************************************/
const express = require('express');
const router = express.Router();
const data = require("../data");
const harshInfo = data.harsh;

router.get("/", (req, res) => {
    let data = harshInfo.getAbout();
    if(data !== null){
        res.json(data);
    }
    else{
        res.status(500).send();
    }
});

router.post("/", (req, res) => {
    // Not implemented
    res.status(501).send();
});

module.exports = router;