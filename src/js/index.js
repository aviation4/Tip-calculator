import {tipButtonToggler, enableResetButton, resetAll, updateResults, inputValidation, determineCustomTipValue} from "./functions.js";
import {inputData, resetButton, inputsDOMArray, tipDOMArray} from "./variables.js";


tipDOMArray.forEach((button, i) => {

  /***** Assign Event Listener *****/
  button.addEventListener("click", function() {

    /* Enable or disable tip buttons */
    tipButtonToggler(button, i);


    /* Enable reset button */
    if (inputData.tipStateArray.some(el => el == 1)){
      enableResetButton();
    }


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
