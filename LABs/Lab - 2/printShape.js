/**
 * Created by Harsh Kevadia on 5/31/2017.
 */

function checkIsProperNumber(val) {
    if (val === undefined || typeof val !== "number") {
        throw `${val || 'provided lines'} is not a number`;
    }
}

module.exports = {

    description: "This is module will print shape",

    triangle: function (lines) {
        checkIsProperNumber(lines);
        for (let k = 0; k < lines; k++) {
            let output = "";
            for (let i = lines - 1; i >= k; i--) {
                output += " ";
            }
            output += "\/";
            for (let j = 0; j < k; j++) {
                if (k === 0) break;
                if (k === lines - 1) {
                    output += "--";
                }
                else {
                    output += "  ";
                }
            }
            output += "\\";
            console.log(output);
        }
    },


    /*
    //Check Function: 
    triangle(1);
    triangle(2);
    triangle(3);
    triangle(4);
    triangle(5);
    triangle(6);
    */
    square: function (lines) {
        checkIsProperNumber(lines);
        if(lines < 2){
            throw `${lines || 'provided lines'} is less than 2`;
        }
        for (let k = 0; k < lines; k++) {
            let output = "";
            output += "|";
            for (let i = 0; i < lines; i++) {
                if (k === 0 || k === lines - 1)
                    output += "-";
                else
                    output += " ";
            }
            output += "|";
            console.log(output);
        }
    },

    /*
    //Check Function: 
    square(2);
    square(3);
    square(4);
    square(5);
    square(6);
    */

    rhombus: function (lines) {
        checkIsProperNumber(lines);
        if(lines < 2 && lines % 2 === 0){
            throw `${lines || 'provided lines'} is less than 2 or not even number`;
        }
        for (let k = 0; k < lines / 2; k++) {
            let output = "";
            for (let i = lines / 2 - k - 1; i > 0; i--) {
                output += " ";
            }
            output += "\/";
            for (let j = 0; j <= k; j++) {
                if (k === 0 && j === 0) {
                    output += "-"
                }
                else if (k === 1) {
                    output += "   ";
                    break;
                }
                else if (j === k) {
                    output += " ";
                }
                else {
                    output += "  ";
                }
            }
            output += "\\";
            console.log(output);
        }
        for (let k = 1; k <= lines / 2; k++) {
            let output = "";
            for (let i = 1; i < k; i++) {
                output += " ";
            }
            output += "\\";
            let flag = true;
            for (let j = lines / 2 - k; j >= 0; j--) {
                if (k === lines / 2 && j === 0) {
                    output += "-"
                    break;
                }
                else if (k === lines / 2 - 1) {
                    output += "   ";
                    break;
                }
                else if (flag) {
                    flag = false;
                    output += " ";
                }
                else {
                    output += "  ";
                }
            }
            output += "\/";
            console.log(output);
        }
    }

    /*
    //Check Function: 
    rhombus(2);
    rhombus(4);
    rhombus(6);
    rhombus(8);
    rhombus(18);
    rhombus(100);
    */
};