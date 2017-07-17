/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Jul 17 2017
 *  File : index.js
 *******************************************/
const palindromeRoutes = require("./palindrome");

const constructorMethod = (app) => {
    app.use("/", palindromeRoutes);

    app.use("*", (req, res) => {
        res.redirect("/static");
    })
};

module.exports = constructorMethod;