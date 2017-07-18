/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Jul 17 2017
 *  File : form.js
 *******************************************/
(function() {
  const palindromList = {};
  const staticForm = document.getElementById("static-form");
  function isPalindrome(text) {
    let originalString = text;
    if (typeof text !== "string") throw "Must provide a string";
    palindromList[originalString] = -999;
    text = text.toLocaleLowerCase();

    //Remove all non-alphanumeric characters (?.!'," and so on)
    text = text.replace(/[^0-9a-z]/gi, "");

    //Convert all white space to simple spaces (new lines become spaces; tabs become spaces, etc)
    text = text.replace(/\s+/g, "");

    if (text == text.split("").reverse().join("")) {
      palindromList[originalString] = 1;
      return "String is palindrom";
    } else {
      palindromList[originalString] = 0;
      throw "String is not palindrom";
    }
  }

  if (staticForm) {
    const textAreaElement = document.getElementById("palindromeText");

    const errorContainer = document.getElementById("error-container");
    const errorTextElement = errorContainer.getElementsByClassName(
      "text-goes-here"
    )[0];

    const resultContainer = document.getElementById("result-container");
    const resultTextElement = resultContainer.getElementsByClassName(
      "text-goes-here"
    )[0];

    staticForm.addEventListener("submit", event => {
      event.preventDefault();
      try {
        errorContainer.classList.add("hidden");
        resultContainer.classList.add("hidden");

        const textAreaElementValue = textAreaElement.value;
        if (textAreaElementValue == "") {
          throw "Must provide a string";
        }
        const result = isPalindrome(textAreaElementValue);

        resultTextElement.textContent = result;
        resultContainer.classList.remove("hidden");
      } catch (e) {
        const message = typeof e === "string" ? e : e.message;
        errorTextElement.textContent = e;
        errorContainer.classList.remove("hidden");
      }
      let outputString = "";
      Object.keys(palindromList).forEach(function(key) {
        if (palindromList[key] == 1) {
          outputString =
            outputString + "<div class='is-palindrome'>" + key + "</div>";
        } else if (palindromList[key] == 0) {
          outputString =
            outputString + "<div class='not-palindrome'>" + key + "</div>";
        }
      });
      $("#history").html(outputString);
      //console.log(outputString);
    });
  }
})();
