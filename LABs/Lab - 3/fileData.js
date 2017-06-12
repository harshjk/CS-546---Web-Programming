/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Jun 8 2017
 *******************************************/

const file = require('fs');

let fileData = exports = module.exports;

fileData.getFileAsString = (path) => {
    let returnPromise = new Promise(function (fulfill, reject) {
        if (typeof path !== "string") {
            throw reject("File Path is not valid");
        }
        file.readFile(path, "utf-8", function (error, data) {
            try {
                if (error) {
                    throw error;
                }
                let fileData = data.toString();
                fulfill(fileData);
            }
            catch (error) {
                reject(error);
            }
        });
    });
    return returnPromise;
}

fileData.getFileAsJSON = (path) => {
    return new Promise((fulfill, reject) => {
        if (typeof path !== "string") {
            throw reject("File Path is not valid");
        }
        file.readFile(path, "utf-8", (error, data) => {
            try {
                fulfill(JSON.parse(data));
            }
            catch (error) {
                reject(error);
            }
        });
    });
}

fileData.saveStringToFile = (path, text) => {
    return new Promise((fulfill, reject) => {
        try {
            if (typeof path !== "string" || typeof text !== "string") {
                throw reject("File Path or text is not valid");
            }
            file.writeFile(path, text, "utf-8", (error) => {
                if (error) {
                    throw error;
                }
                else {
                    fulfill(`Create new file and write ${text} to ${path} File`);
                }
            });
            /*file.open(path, 'r', (error, data) => {
                 if (error) {
                     file.writeFile(path, text, (error) => {
                         if (error) {
                             throw error;
                         }
                         else {
                             fulfill(`Create new file and write ${text} to ${path} File`);
                         }
                     })
                 }
                 else {
                     file.appendFile(path, text, "utf-8", (error) => {
                         if (error) {
                             throw error;
                         }
                         else {
                             fulfill(`Appended ${text} to ${path} File`);
                         }
                     })
                 }
             });*/
        }
        catch (error) {
            reject(error);
        }
    });
}

fileData.saveJSONToFile = (path, obj) => {
    return new Promise((fulfill, reject) => {
        try {
            if (typeof path !== "string" || typeof obj !== "object") {
                throw reject("File Path or object is not valid");
            }
            file.writeFile(path, JSON.stringify(obj, null, 5), "utf-8", (error) => {
                if (error) {
                    throw error;
                }
                else {
                    fulfill(`Create new JSON file and write ${obj} to ${path} File`);
                }
            });
            /*file.open(path, 'r', (error, data) => {
                if (error) {
                    file.writeFile(path, JSON.stringify(obj, null, 5), "utf-8", (error) => {
                        if (error) {
                            throw error;
                        }
                        else {
                            fulfill(`Create new file and write ${obj} to ${path} File`);
                        }
                    })
                }
                else {
                    file.appendFile(path, JSON.stringify(obj, null, 5), "utf-8", (error) => {
                        if (error) {
                            throw error;
                        }
                        else {
                            fulfill(`Appended ${obj} to ${path} File`);
                        }
                    })
                }
            });*/
        }
        catch (error) {
            reject(error);
        }
    });
}

/*
//Testing
fileData.getFileAsString(123)
    .then(function (data) {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });

fileData.getFileAsJSON("tmp.json")
    .then(function (data) {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });

fileData.saveStringToFile("tmp.txt", "This is append example")
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });

fileData.saveStringToFile("tmp1.txt", "This is Creating New File")
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });

let itemCount = 1;
let items = [
    { id: itemCount++, item: "Sword of Truth" },
    { id: itemCount++, item: "Book of Wisdom" },
    { id: itemCount++, item: "Potion of Healing" },
];

fileData.saveJSONToFile("tmp.JSON", items)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });

fileData.saveJSONToFile("tmp1.JSON", items)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
*/