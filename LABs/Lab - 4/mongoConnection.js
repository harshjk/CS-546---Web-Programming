/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Jun 12 2017
 *  File : mongoConnection.js
 *******************************************/
const MongoClient = require("mongodb").MongoClient;

const settings = {
    mongoConfig: {
        serverUrl: "mongodb://localhost:27017/",
        database: "lab4"
    }
};

let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let _connection = undefined

let connectDb = () => {
    if (!_connection) {
        _connection = MongoClient.connect(fullMongoUrl)
            .then((db) => {
                return db;
            });
    }
    return _connection;
};

/*let closeDb = () => {
    if(_connection){
        _connection.close();
    }
};*/

/*module.exports = {
    connectDb: connectDb,
    closeDb: closeDb
};*/

module.exports = connectDb;