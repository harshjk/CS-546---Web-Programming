/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Jun 12 2017
 *  File : todo.js
 *******************************************/
const uuidV4 = require('uuid/v4');
let todo = exports = module.exports;

todo.createTask = (title, description) => {
    return new Promise((fulfill, reject) => {
        try {
            if (typeof title !== "string" || typeof description !== "string") {
                throw "Title and Description must be in String";
            }
            // Creating Todo Object
            todoObject = {};
            todoObject.id = uuidV4.uuidV4();
            todoObject.title = title;
            todoObject.description = description;
            todoObject.completed = false;
            todoObject.completedAt = null;
        }
        catch (error) {
            reject(error);
        }
    });
};