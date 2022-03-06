import {
  tipButtonToggler,
  enableResetButton,
  resetAll,
  updateResults,
  inputValidation,
  enableCurrencyModule,
  retrieveAPI,
  renderCurrency,
  calculateResults,
  determineCurrencySymbol,
  checkResultsLayout
} from "./functions.js";
import {
  inputData,
  resetButton,
  inputsDOMArray,
  tipDOMArray,
  currencyButton,
  currencyArray,
  extraInfoBillCurrencyIcon,
  extraInfoBillCurrencyText,
  extraInfoUserCurrencyIcon,
  extraInfoUserCurrencyText,
  resultTip
} from "./variables.js";


tipDOMArray.forEach((button, i) => {

  /***** Assign Event Listener *****/
  button.addEventListener("click", function() {

    /* Enable or disable tip buttons */
    tipButtonToggler(button, i);


    /* Enable reset button */
    if (inputData.tipStateArray.some(el => el == 1)) {
      enableResetButton();
    }


    /* Update results (calculate or reset) */
    updateResults();

  });

})


/*** Enabling currency module ***/
currencyButton.addEventListener("click", function() {

  enableCurrencyModule();

  enableResetButton();

})





currencyArray.forEach((currency, i, array) => {


  currency.addEventListener("input", function() {



    if (array[0].value != array[1].value) {
      retrieveAPI(array[0].value, array[1].value)
        .then(jsonResponse => renderCurrency(jsonResponse))
        .then(updateResults);
    } else {
      determineCurrencySymbol();
      currencyInfo.style.display = "none";
      inputData.currencyRate = 1;
      updateResults();
    }





  })

})



/*** Resetting ***/
resetButton.addEventListener("click", function() {

  resetAll();

})


inputsDOMArray.forEach((input, i) => {

  /***** Assign Event Listener *****/
  input.addEventListener("input", function() {

    if (i == 1) {
       inputData.tipValue = inputsDOMArray[1].value;
    }

    /* Check if provided data are correct */
    inputValidation(input, i);


    /* Enable reset button */
    enableResetButton();


    /* Update results (calculate or reset) */
    updateResults();

  })


})


extraInfoBillCurrencyIcon.addEventListener("mouseover", function() {

  extraInfoBillCurrencyText.style.zIndex = "1";
  extraInfoBillCurrencyText.style.opacity = "0.93";


})


extraInfoBillCurrencyIcon.addEventListener("mouseout", function() {

  extraInfoBillCurrencyText.style.opacity = "0";
  setTimeout(() => {
    extraInfoBillCurrencyText.style.zIndex = "-1"
  }, 200);

})


extraInfoUserCurrencyIcon.addEventListener("mouseover", function() {

  extraInfoUserCurrencyText.style.zIndex = "1";
  extraInfoUserCurrencyText.style.opacity = "0.93";


})


extraInfoUserCurrencyIcon.addEventListener("mouseout", function() {

  extraInfoUserCurrencyText.style.opacity = "0";
  setTimeout(() => {
    extraInfoUserCurrencyText.style.zIndex = "-1"
  }, 200);
})
