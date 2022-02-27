import {tipButtonToggler, enableResetButton, resetAll, updateResults, inputValidation, determineCustomTipValue, enableCurrencyModule, retrieveAPI, renderCurrency, calculateResults} from "./functions.js";
import {inputData, resetButton, inputsDOMArray, tipDOMArray, currencyButton, currencyArray} from "./variables.js";


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


/*** Enabling currency module ***/
currencyButton.addEventListener("click", function() {

  enableCurrencyModule();

})





currencyArray.forEach((currency, i, array) => {


  currency.addEventListener("input", function () {


    if (array[0].value != array[1].value){
      retrieveAPI(array[0].value, array[1].value)
        .then(jsonResponse => renderCurrency(jsonResponse))
        .then(calculateResults);
    } else {
      calculateResults();
    }
  } )

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
