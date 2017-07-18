/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Jul 17 2017
 *  File : palindrome.js
 *******************************************/
const express = require("express");
const router = express.Router();
const data = require("../data");
const palindrome = data.palindrome;

router.get("/", (req, res) => {
  res.render("palindrome/static", {});
});

router.get("/server", (req, res) => {
  res.render("palindrome/server", {});
});

/* router.post("/server", (req, res) => {
  let firstNumber = str(req.body.number1);
  let secondNumber = parseInt(req.body.number2);
  let result;

  try {
    switch (operation) {
      case "add":
        result = palindrome.add(firstNumber, secondNumber);
        break;
      case "subtract":
        result = palindrome.subtract(firstNumber, secondNumber);
        break;
      case "multiply":
        result = palindrome.multiply(firstNumber, secondNumber);
        break;
      case "divide":
        result = palindrome.divide(firstNumber, secondNumber);
        break;
      default:
        throw "Operation not supported";
    }
  } catch (e) {
    res.render("calculator/server", {
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      operation: operation,
      error: e
    });
    return;
  }

  res.render("calculator/server", {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    operation: operation,
    result: result
  });
}); */

module.exports = router;
