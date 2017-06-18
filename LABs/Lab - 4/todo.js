/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Jun 12 2017
 *  File : todo.js
 *******************************************/
const uuidV4 = require('uuid/v4');
const mongoCollections = require('./mongoCollections');

const todoItems = mongoCollections.todoItems;
const closeDb = mongoCollections.closeDb;

let todo = exports = module.exports;

todo.getTask = (id) => {
    return new Promise((fulfill, reject) => {
        try {
            if (typeof id !== "string") {
                throw "ID must be in String";
            }
            todoItems()
                .then((todoCollection) => {
                    todoCollection
                        .findOne({ _id: id })
                        .then((data) => {
                            fulfill(data);
                        })
                        .catch((error) => {
                            reject(error);
                        })
                })/*
                .then(() => {
                    closeDb();
                })*/
                .catch((error) => {
                    reject(error);
                });
        }
        catch (error) {
            reject(error);
        }
    });
}

todo.createTask = (title, description) => {
    return new Promise((fulfill, reject) => {
        try {
            if (typeof title !== "string" || typeof description !== "string") {
                throw "Title and Description must be in String";
            }
            todoItems()
                .then((todoCollection) => {
                    let todoObject = {
                        _id: uuidV4(),
                        title: title,
                        description: description,
                        completed: false,
                        completedAt: null
                    };

                    todoCollection
                        .insertOne(todoObject)
                        .then((newInsertInformation) => {
                            //console.log(newInsertInformation);
                            return newInsertInformation.insertedId;
                        })
                        .then((newId) => {
                            fulfill(todo.getTask(newId));
                        })/*
                        .then(() => {
                            closeDb();
                        })*/
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        }
        catch (error) {
            reject(error);
        }
    });
};


todo.getAllTasks = () => {
    return new Promise((fulfill, reject) => {
        try {
            //let resultData = [];
            todoItems()
                .then((todoCollection) => {
                    fulfill(todoCollection.find({}).toArray());
                    /*let dataCursor = todoCollection.find({});
                    cursor
                        .each(function (error, data) {
                            if (data == null) {
                                fulfill(resultData);
                            }
                            resultData.push(data);
                        })
                        .catch((error) => {
                            throw error;
                        })*/
                })/*
                .then(() => {
                    closeDb();
                })*/
                .catch((error) => {
                    reject(error);
                });
        }
        catch (error) {
            reject(error);
        }
    });
};

todo.completeTask = (taskId) => {
    return new Promise((fulfill, reject) => {
        if (typeof taskId !== "string") {
            reject("ID must be in String");
        }
        else {
            todoItems()
                .then((todoCollection) => {
                    let updateTask = {
                        completed: true,
                        completedAt: Date.now()
                    };

                    todoCollection
                        .findOneAndUpdate({ _id: taskId }, { $set: updateTask })
                        .then((newUpdateInformation) => {
                            //console.log(newUpdateInformation);
                            if (!newUpdateInformation) {
                                reject(`Could not update Task with id of ${id}`);
                            }
                        })
                        .then(() => {
                            fulfill(todo.getTask(taskId));
                        })/*
                        .then(() => {
                            closeDb();
                        })*/
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        }
    });
};

todo.removeTask = (id) => {
    return new Promise((fulfill, reject) => {
        try {
            if (typeof id !== "string") {
                throw "ID must be in String";
            }
            todoItems()
                .then((todoCollection) => {
                    return todoCollection.deleteOne({ _id: id });
                })
                .then((deletionInfo) => {
                    if (!deletionInfo) {
                        reject(`Could not delete Task with id of ${id}`);
                    }
                    else if (deletionInfo.deletedCount === 0) {
                        reject(`Could not delete Task with id of ${id}`);
                    }
                    else if (deletionInfo.deletedCount === 1) {
                        fulfill(`Task deleted with id of ${id}`);
                    }
                })/*
                .then(() => {
                    closeDb();
                })*/
                .catch((error) => {
                    reject(error);
                });
        }
        catch (error) {
            reject(error);
        }
    });
};

//Testing


/*let testId = null;
//let deleteID = "83997be2-5a83-4c7e-b13e-e460b069f9c2";
todo.createTask("Harsh", "I am Harsh Kevadia")
    .then(function (data) {
        console.log(data);
        return data._id;
    })
    .then((newId) => {
        this.completeTask(newId)
            .then(function (updatedData) {
                console.log(updatedData);
            })
            .then(() => {
                this.removeTask(newId)
                    .then((removeData) => {
                        console.log(removeData);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    })
    .catch((error) => {
        console.error(error);
    });
this.removeTask("Harsh")
    .then((removeData) => {
        console.log(removeData);
    })
    .catch((error) => {
        console.error(error);
    });*/
/*todo.getAllTasks()
    .then(function (data) {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });*/
//console.log(deleteID);
//console.log(typeof deleteID);
/*todo.removeTask(deleteID)
    .then(function (data) {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });*/
//console.log(testId);
/*todo.completeTask(testId)
    .then(function (data) {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });*/