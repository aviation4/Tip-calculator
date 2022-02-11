import {inputData, inputWarningOutline} from "./variables.js";
import {buttonEnabled, resetButton, resultTip, resultTotal, tipDOMArray, inputsDOMArray, warningInfoDOMArray} from "./variables.js";


export const tipButtonToggler = (button, i) => {


  /* If the pressed button is already enabled  (except from "Custom" input) */
  if (inputData.tipStateArray[i] == 1 && i != 5){

    /* disable it */
    button.classList.remove(buttonEnabled);
    inputData.tipStateArray[i] = 0;
    inputData.inputValidityArray[1] = 0;
    inputData.tipValue = 0;

  }

  /* If any other button is enabled AND it isn't pressed custom input with already provided value */
  else if (inputData.tipStateArray.some(value => value == 1) && !(inputData.tipStateArray[5] == 1 && i == 5)){

    /* disable it */
    tipDOMArray.forEach(button => button.classList.remove(buttonEnabled));
    /* Clean custom input, but only when button is pressed */
    if (i != 5){
      inputsDOMArray[1].value = "";
    }
    inputData.tipValue = 0;
    inputData.inputValidityArray[1] = 0;
    inputData.tipStateArray.forEach((element, index, array) => array[index] = 0);


    /* and enable pressed button */
    if (i != 5){
      button.classList.add(buttonEnabled);
      inputData.tipStateArray[i] = 1;
      inputData.inputValidityArray[1] = 1;
      inputData.tipValue = tipDOMArray[i].value;
    }


  }

  /* If all buttons are disabled*/
  else if (inputData.tipStateArray.every(value => value == 0)) {

    /* and enable pressed button */
    if (i != 5){
      button.classList.add(buttonEnabled);
      inputData.tipStateArray[i] = 1;
      inputData.inputValidityArray[1] = 1;
      inputData.tipValue = tipDOMArray[i].value;
    }


  }

}


export function enableResetButton() {

  resetButton.classList.add(buttonEnabled);

}


export function determineCustomTipValue() {
  inputData.tipValue = inputsDOMArray[1].value;
}


export function resetAll() {

  /* Reset input values */
  inputsDOMArray.forEach(el => el.value = "");
  inputsDOMArray.forEach(el => el.classList.remove(inputWarningOutline));
  tipDOMArray.forEach(el => el.classList.remove(buttonEnabled));



  inputData.tipStateArray.forEach(el => el = 0);
  inputData.inputValidityArray.forEach(el => el = 0);
  inputData.tipValue = 0;





  resultTip.innerHTML = "$" + 0;
  resultTotal.innerHTML = "$" + 0;
  warningInfoDOMArray.forEach(el => el.textContent = "");



  /* Disable reset button */
  resetButton.classList.remove(buttonEnabled);

}


export function inputValidation(input, i){


  if (input.validity.valid){
    warningInfoDOMArray[i].textContent = "";
    input.classList.remove(inputWarningOutline);
    inputData.inputValidityArray[i] = 1;
    if (i == 1){
      inputData.tipStateArray[5] = 1;
    }
  } else {
    showError(input, i);
  }

}


function showError(input, i){
  inputData.inputValidityArray[i] = 0;
  if (input.validity.rangeOverflow){
    warningInfoDOMArray[i].textContent = "Big numbo bro";
  } else if (input.validity.rangeUnderflow){
    warningInfoDOMArray[i].textContent = "No negative numbo bro";
  } else if (input.validity.badInput){
    warningInfoDOMArray[i].textContent = "Only numbos bro";
  } else if (input.validity.tooLong){
    warningInfoDOMArray[i].textContent = "Too long bro";
  } else if (input.validity.stepMismatch){
    warningInfoDOMArray[i].textContent = "Please type a whole number";
  } else if (input.validity.patternMismatch){
    warningInfoDOMArray[i].textContent = "Invalid pattern";
  }
}



export function updateResults() {

     /* If all data are complete, calcualate results */
  if (inputData.areAllValid()){

    calculateResults();

  /* If any data are incomplete, set results to $0 */
  } else {

    resetResults();

  }

}



export function calculateResults() {

  /** Calculate tip and total, with two decimal numbers **/
  /* e.g. tipFactor = 1.25 means 25% tip */
  const tipFactor = 1 + (inputData.tipValue) / 100;
  const resultTipNotRounded = ((inputsDOMArray[0].value * tipFactor) - inputsDOMArray[0].value) / inputsDOMArray[2].value;

  resultTip.innerHTML = Math.round(resultTipNotRounded * 100) / 100;
  resultTotal.innerHTML = Math.round(inputsDOMArray[0].value * tipFactor / inputsDOMArray[2].value * 100) / 100;


  /* When data are wrongly calculated /*/
  if (resultTip.innerHTML == "Infinity" ||
      resultTotal.innerHTML == "Infinity" ||
      resultTip.innerHTML == "NaN" ||
      resultTotal.innerHTML == "NaN"
    ) {
    resultTip.innerHTML = "0";
    resultTotal.innerHTML = "0";
   }

   console.log(resultTip.innerHTML);
   console.log(resultTotal.innerHTML);


  /* When tip result is too long - compress to thousands (k) millions (M) */
  if (resultTip.innerHTML > 1000000){
    resultTip.innerHTML = Math.round(resultTip.innerHTML / 1000000 * 100 ) / 100  + "M";
  } else if (resultTip.innerHTML > 10000){
    resultTip.innerHTML = Math.round(resultTip.innerHTML / 1000 * 100) / 100 + "k";
  }


  /* Add dollar sign */
  resultTip.innerHTML = "$" + resultTip.innerHTML;


  /* When total result is too long - compress to thousands (k) millions (M) */
  if (resultTotal.innerHTML > 1000000){
    resultTotal.innerHTML = Math.round(resultTotal.innerHTML / 1000000 * 100) / 100 + "M";
  } else if (resultTotal.innerHTML > 10000){
    resultTotal.innerHTML = Math.round(resultTotal.innerHTML / 1000 * 100) / 100 + "k";
  }





  /* Add dollar sign */
  resultTotal.innerHTML = "$" + resultTotal.innerHTML;


}





function resetResults() {

  resultTip.innerHTML = "$" + "0";
  resultTotal.innerHTML = "$" + "0";

}





function isArrayEqual(a, b) {

  /* Compare if arrays "a" and "b" have the same elements */
  return a.length === b.length &&
         a.every((val, index) => val === b[index]);
}
