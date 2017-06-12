/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Sun Jun 11 2017
 *  File : textMetrics.js
 *******************************************/
let textMetrics = exports = module.exports;

const hashMap = require('hashmap');

textMetrics.simplify = (text) => {
    let simplifyText = text;

    // Conver String into lowercase
    simplifyText = simplifyText.toLowerCase();

    //Remove all non-alphanumeric characters (?.!'," and so on)
    simplifyText = simplifyText.replace(/[^0-9a-z]/gi, ' ');

    //Convert all white space to simple spaces (new lines become spaces; tabs become spaces, etc)
    simplifyText = simplifyText.replace(/\s+/g, ' ');

    //Return Simple String
    return simplifyText;
}

textMetrics.createMetrics = (text) => {
    let returnObject = new Object();

    // HashMap for Word Occurnce Count
    let map = new hashMap.HashMap();

    // Simplify the String
    let simplifyText = textMetrics.simplify(text);
    //returnObject.simplifyText = simplifyText;

    //totalLetters: total number of letters in the text
    returnObject.totalLetters = simplifyText.replace(/[^0-9a-z]/gi, '').length;

    //totalWords: total number of words in the text
    returnObject.totalWords = simplifyText.split(' ').length;

    //uniqueWords: total number of unique words that appear in the text

    // Creating Word Occurance Hash Map
    simplifyText.split(' ').forEach(function (element) {
        if (map.get(element)) {
            map.set(element, map.get(element) + 1);
        }
        else {
            map.set(element, 1);
        }
    }, this);
    //returnObject.wordHashMap = map;
    returnObject.uniqueWords = map.count();

    //longWords: number of words in the text that are 6 or more letters long
    let longWordCounter = 0;
    let wordOccurrences = {};
    map.forEach((value, key) => {
        wordOccurrences[key] = value;
        if(key.length > 5){
            longWordCounter++;
        }
    });
    returnObject.longWords = longWordCounter;

    //averageWordLength: the average number of letters in a word in the text,
    returnObject.averageWordLength = returnObject.totalLetters / returnObject.totalWords;

    //wordOccurrences: a dictionary of each word (lowercased, no punctuation) and how many times each word occurs in the text.
    returnObject.wordOccurrences = wordOccurrences;

    return returnObject;
}

/*
//Testing
console.log("Hello, my friends! This is a great day to say hello.\n\n\tHello! 2 3 4 23");
console.log("\n\n\n\n");
console.log(textMetrics.simplify("Hello, my friends! This is a great day to say hello.\n\n\tHello! 2 3 4 23"));
console.log(textMetrics.createMetrics("Hello, my friends! This is a great day to say hello.\n\n\tHello! 2 3 4 23"));
*/