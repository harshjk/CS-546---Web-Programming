/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Jun 12 2017
 *  File : todoItems.js
 *******************************************/
const mongoCollections = require("./mongoCollections");
const todoItems = mongoCollections.todoItems;

let todoItemsAPIs = exports = module.exports;

todoItemsAPIs.addTodo = (todo) => {
    return new Promise((fulfill, reject) => {
        try {
            if (!todo) {
                throw "There is no object passed";
            }
            todoItems.insertOne(todo)
        }
        catch (error) {
            reject(error);
        }
    });
};