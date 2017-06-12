/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Sun Jun 11 2017
 *  File : app.js
 *******************************************/

const fileData = require('./fileData');
const textMetrics = require('./textMetrics')


function computeMetrics(fileRealName) {
    try {
        if (typeof fileRealName !== "string") {
            throw "File name must be in String";
        }
        let fileName = fileRealName.split(".")[0];
        fileData.getFileAsJSON(fileName.concat(".result.json"))
            .then(function (data) {
                console.log(data);
                //console.log("From Exist File");
            })
            .catch((error) => {
                fileData.getFileAsString(fileRealName)
                    .then(function (data) {
                        //console.log(data);
                        let simplifyText = textMetrics.simplify(data);
                        fileData.saveStringToFile(fileName.concat(".debug.txt"), simplifyText)
                            .catch((error) => {
                                //console.error(error);
                                throw error;
                            });
                        let textMetricsObject = textMetrics.createMetrics(data);
                        fileData.saveJSONToFile(fileName.concat(".result.json"), textMetricsObject)
                            .catch((error) => {
                                //console.error(error);
                                throw error;
                            });
                        console.log(textMetricsObject);
                    })
                    .catch((error) => {
                        //console.error(error);
                        throw error;
                    });
            });
    }
    catch (error) {
        throw error;
    }
}

try {
    computeMetrics("chapter1.txt");
    computeMetrics("chapter2.txt");
    computeMetrics("chapter3.txt");
    //computeMetrics(123);
}
catch (error) {
    console.error(error);
}

/*
fileData.getFileAsJSON("chapter1.result.json")
    .then(function (data) {
        console.log(data);
        //console.log("From Exist File");
    })
    .catch((error) => {
        fileData.getFileAsString("chapter1.txt")
            .then(function (data) {
                //console.log(data);
                let simplifyText = textMetrics.simplify(data);
                fileData.saveStringToFile("chapter1.debug.txt", simplifyText)
                    .catch((error) => {
                        console.error(error);
                    });
                let textMetricsObject = textMetrics.createMetrics(data);
                fileData.saveJSONToFile("chapter1.result.json", textMetricsObject)
                    .catch((error) => {
                        console.error(error);
                    });
                console.log(textMetricsObject);
            })
            .catch((error) => {
                console.error(error);
            });
    });
*/