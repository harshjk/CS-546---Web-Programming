/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Jun 12 2017
 *  File : app.js
 *******************************************/
const todo = require('./todo');
const connection = require("./mongoConnection");

let firstTask = todo.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");

let secondTask = firstTask.then((task) => {
    console.log(task);
    //console.log("Second Task");
    return todo.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
});

let allTasks = secondTask.then(() => {
    //console.log("Third Task");
    return todo.getAllTasks()
        .then((tasks) => {
            console.log(tasks);
            return tasks;
        })
        .catch((error) => {
            console.error(error);
        });
});

let removeFirstTask = allTasks.then((tasks) => {
    //console.log("Forth Task");
    return todo
        .removeTask(tasks[0]._id)
        .then((deleteMsg) => {
            //console.log(deleteMsg);
            //return deleteMsg;
        })
        .catch((error) => {
            console.error(error);
        });

});

let getAllTasks = removeFirstTask.then(() => {
    //console.log("Fifth Task");
    return todo.getAllTasks()
        .then((tasks) => {
            console.log(tasks);
            return tasks;
        })
        .catch((error) => {
            console.error(error);
        });
});

let completeOneTask = (taskID) => {
    return todo.completeTask(taskID)
        .then((updatedTask) => {
            return updatedTask;
        })
        .catch((error) => {
            console.error(error);
        });
};

let completeTask = getAllTasks.then((TasksDone) => {
    //console.log("Sixth Task");
    console.log(TasksDone);

    for (let i = 0, len = TasksDone.length; i < len; i++) {
        task = TasksDone[i];
        completeOneTask(task._id);
    }

});

let tasks = completeTask.then(() => {
    //console.log("Seventh Task");
    return todo.getAllTasks()
        .then((tasks) => {
            console.log(tasks);
            return tasks;
        })
        .catch((error) => {
            console.error(error);
        });
});

tasks
    .then(() => {
        //console.log("Get Connection");
        return connection();
    }).catch((err) => {
        //console.error(err);
        return connection();
    }).then((db) => {
        //console.log("Close DB");
        return db.close();
    })
    .catch((error) => {
        console.error(error);
    });