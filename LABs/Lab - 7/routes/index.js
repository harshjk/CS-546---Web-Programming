/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Wed Jul 12 2017
 *  File : index.js
 *******************************************/
const recipesRoutes = require("./recipes");
const commentsRoutes = require("./comments");

const constructorMethod = (app) => {
    app.use("/recipes", recipesRoutes);
    app.use("/comments", commentsRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;