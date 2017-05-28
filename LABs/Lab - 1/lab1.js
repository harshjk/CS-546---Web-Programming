/**
 * Created by Harsh Kevadia on 5/25/2017.
 */

function sumOfSquares(num1, num2,num3) {
    if(typeof num1 === 'number' && typeof num2 === 'number' && typeof num3 === 'number'){
        return Math.pow(num1,2) + Math.pow(num2,2) + Math.pow(num3,2);
    }
    else{
        throw "Error in sumOfSquares Function: BAD Parameter";
    }
}

function sayHelloTo(firstName, lastName, title) {

    if(typeof firstName === 'undefined' && typeof lastName === 'undefined' && typeof title === 'undefined') {
        throw "Error in sayToHello Function : No Parameter passed";
    }
    if(typeof firstName === 'string' && typeof lastName === 'undefined' && typeof title === 'undefined') {
        console.log("Hello, " + firstName + "!")
    }
    else if (typeof firstName === 'string' && typeof lastName === 'string' && typeof title === 'undefined'){
        console.log("Hello, " + firstName + " " + lastName + ". I hope you are having a good day!");
    }
    else if (typeof firstName === 'string' && typeof lastName === 'string' && typeof title === 'string'){
        console.log("Hello, " + title + " " + firstName + " " + lastName + "! Have a good evening!");
    }
    else{
        throw "Error in sayToHello Function : No Parameter passed";
    }
}

function cupsOfCoffee(howManyCups) {
    if(typeof howManyCups !== 'number'){
        throw "Error in cupsOfCoffee Function: BAD argument";
    }
    let song = "";
    for(let i = howManyCups; i >= 1; i--){
        if(i !== 1) {
            song += i.toString() + " cups of coffee on the desk! " + i.toString() + " cups of coffee! \nPick one up, drink the cup, " + (i-1).toString() + " cups of coffee on the desk!\n";
        }
        else{
            song += i.toString() + " cups of coffee on the desk! " + i + " cups of coffee! \nPick one up, drink the cup, no cups of coffee on the desk!\n";
        }
    }
    return song;
}


function occurrencesOfSubstring(fullString, substring) {
    if (typeof fullString !== 'string' && typeof substring !== 'string'){
        throw "Error in occurrencesOfSubstring Function: BAD argument";
    }
    else {
        let count = 0;
        let pos = fullString.indexOf(substring);
        while (pos > -1) {
            ++count;
            pos = fullString.indexOf(substring, ++pos);
        }
        return count;
    }
}

function randomizeSentences(paragraph) {
    if (typeof paragraph !== 'string'){
        throw "Error in randomizeSentences Function: BAD argument";
    }
    else {
        let sentences = paragraph.match(/[^\.!\?]+[\.!\?]+/g);
        for (let i = sentences.length - 1; i > 0; i -= 1) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = sentences[i];
            sentences[i] = sentences[j];
            sentences[j] = temp;
        }
        return sentences.join();
    }
}

try {
    //console.log(sumOfSquares(12, 15, "Harsh"));
    console.log(sumOfSquares(12, 15, 12));

    sayHelloTo("Harsh");
    sayHelloTo("Harsh", "Kevadia");
    sayHelloTo("Harsh", "Kevadia", "Research Engineer");
    //sayHelloTo();

    console.log(cupsOfCoffee(10));
    //console.log(cupsOfCoffee("Harsh"));

    console.log(occurrencesOfSubstring("Helllllllo, class!", "ll"));
    //console.log(occurrencesOfSubstring(123433335, 1));

    var paragraph = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";

    console.log(randomizeSentences(paragraph));

}
catch (e){
    console.log(e);
}