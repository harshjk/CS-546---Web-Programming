/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Jun 12 2017
 *  File : mongoCollections.js
 *******************************************/
const dbConnection = require("./mongoConnection");

//const dbConnection = mongoConnection.connectDb;
//const dbClose = mongoConnection.closeDb;

let _col = undefined;

let getCollectionFn = (collection) => {
    return () => {
        if (!_col) {
            _col = dbConnection().then(db => {
                return db.collection(collection);
            });
        }

        return _col;
    }
}
/*
let closeDb = () => {
    dbClose();
}*/

module.exports = {
    todoItems: getCollectionFn("todoItems")
    //closeDb: closeDb()
};