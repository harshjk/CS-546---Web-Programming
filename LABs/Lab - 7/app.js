/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Tue Jul 11 2017
 *  File : app.js
 *******************************************/
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const configRoutes = require("./routes");

app.use(bodyParser.json());
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});