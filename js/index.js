import {tipButtonToggler, enableResetButton, resetAll, updateResults, inputValidation, determineCustomTipValue} from "./functions.js";
import {inputData, resetButton, inputsDOMArray, tipDOMArray} from "./variables.js";


tipDOMArray.forEach((button, i) => {

  /***** Assign Event Listener *****/
  button.addEventListener("click", function() {


    /* Enable or disable tip buttons */
    tipButtonToggler(button, i);


    /* Enable reset button */
    enableResetButton();


    /* Update results (calculate or reset) */
    updateResults();

  });

})


/*** Resetting ***/
resetButton.addEventListener("click", function() {

  resetAll();

})


inputsDOMArray.forEach((input, i) => {

  /***** Assign Event Listener *****/
  input.addEventListener("input", function() {


    if (i == 1){
      determineCustomTipValue();
    }

    /* Check if provided data are correct */
    inputValidation(input, i);


    /* Enable reset button */
    enableResetButton();


    /* Update results (calculate or reset) */
    updateResults();

  })


})





/* Results */
const invalidCharsWithDot = new Array("-", "+", "e", ",", ".");
const invalidCharsWithoutDot = new Array ("-", "+", "e", ",");



/**** Warning texts ****/
const periodText = "Use period (.) operator";
const mustBeNumberText = "Must be a number";
const mustBeIntegerText = "Must be a whole number";
const mustBePositiveText = "Must be greater than zero";
const cantBeHigherText = "Don't you have enough?";
const decimalNumbersText = "Too many decimal numbers";





//
//
// inputArray.forEach(function(el, i) {
//
//
//
//
//     el.addEventListener("blur", function() {
//     inputValidation(el, i);
//   });
//
//
//
//   el.addEventListener("input", function(event) {
//
//
//     /* Validate inserted data */
//     inputValidation(el, i);
//
//
//     /* Enable reset buton */
//     enableResetButton();
//
//
//     /* Update results (calculate or reset) */
//     updateResults();
//
//
//   });
//
// });
