import {inputData, inputWarningOutline} from "./variables.js";
import {buttonEnabled, resetButton, resultTip, resultTotal, tipDOMArray, inputsDOMArray} from "./variables.js";


export const tipButtonToggler = (button, i) => {


  /* If the pressed button is already enabled  (except from "Custom" input) */
  if (inputData.tip.tipStateArray[i] == 1 && i != 5){

    /* disable it */
    button.classList.remove(buttonEnabled);
    inputData.tip.tipStateArray[i] = 0;
    inputData.tip.isValid = 0;
    inputData.tip.value = 0;

  }

  /* If any other button is enabled */
  else if (inputData.tip.tipStateArray.some(value => value == 1)){

    /* disable it */
    tipDOMArray.forEach(button => button.classList.remove(buttonEnabled));
    inputsDOMArray[1].value = "";
    inputData.tip.tipStateArray.forEach((element, index, array) => array[index] = 0);
    inputData.tip.isValid = 0;
    inputData.tip.value = 0;


    /* and enable pressed button */
    if (i != 5){
      button.classList.add(buttonEnabled);
    }
    inputData.tip.tipStateArray[i] = 1;
    inputData.tip.value = tipDOMArray[i].value;
    inputData.tip.isValid = 1;

  }

  /* If all buttons are disabled*/
  else if (inputData.tip.tipStateArray.every(value => value == 0)) {

    /* and enable pressed button */
    if (i != 5){
      button.classList.add(buttonEnabled);
    }
    inputData.tip.tipStateArray[i] = 1;
    inputData.tip.value = tipDOMArray[i].value;
    inputData.tip.isValid = 1;

  }

}


export function enableResetButton() {

  resetButton.classList.add(buttonEnabled);

}


export function resetAll() {

  /* Reset input values */
  inputsDOMArray.forEach(el => el.value = "");
  inputsDOMArray.forEach(el => el.classList.remove(inputWarningOutline));
  tipDOMArray.forEach(el => el.classList.remove(buttonEnabled));

  inputData.bill.value = 0;
  inputData.bill.isValid = 0;

  inputData.tip.tipStateArray.forEach((el, i) => el = 0);
  inputData.tip.value = 0;
  inputData.tip.isValid = 0;

  inputData.people.value = 0;
  inputData.people.isValid = 0;


  resultTip.innerHTML = "$" + 0;
  resultTotal.innerHTML = "$" + 0;/*
  warningInfoBill.innerHTML = "";
  warningInfoTip.innerHTML = "";
  warningInfoPeople.innerHTML = "";
*/

  /* Disable reset button */
  resetButton.classList.remove(buttonEnabled);

}


function keydownValidation (el, i) {

  let regex = /[a-z]/i;
  let currentInputWarning;
  let currentInputField;
  let invalidChars = [];


  /* Assign data to input type currently active */
  switch (i) {
    case 0:
      currentInputWarning = warningInfoBill;
      currentInputField = inputBill;
      invalidChars = invalidCharsWithoutDot.slice();
      break;

    case 1:
      currentInputWarning = warningInfoTip;
      currentInputField = inputTip;
      invalidChars = invalidCharsWithDot.slice();
      /* If any tip was already enabled, diasble all of them */
      if (isTipButtonEnabled == 1){
        buttonTipArray.forEach(el => el.classList.remove(buttonEnabled));
        isTipButtonEnabled = 0;
      }
      break;

    case 2:
      currentInputWarning = warningInfoPeople;
      currentInputField = inputPeople;
      invalidChars = invalidCharsWithDot.slice();
      break;
  }


  /* Enable warning text and outline by default, will be disabld when everything is ok */
  currentInputWarning.style.opacity = "1";
  currentInputField.classList.add(inputWarningOutline);


  /* Display info about using dot (period) instead of comma for bill input only */
  if (event.key == "," && i == 0) {
    currentInputWarning.innerHTML = periodText;

  /* Display info about not using dot (period) or comma for tip and people input only */
  } else if ((event.key == "," || event.key == ".") && (i == 1 || i == 2)) {
    currentInputWarning.innerHTML = mustBeIntegerText;

  /* Display info about using hyphen */
  } else if (event.key == "-") {
    currentInputWarning.innerHTML = mustBePositiveText;

  /* Display info about using numbers only (considering Backspace, Delete, Arrows) */
  } else if (regex.test(event.key) &&
    event.key !== "Backspace" &&
    event.key !== "Delete" &&
    event.key !== "ArrowLeft" &&
    event.key !== "ArrowRight" ||
    event.key == " ") {
    currentInputWarning.innerHTML = mustBeNumberText;

  /* If everything is ok, disable warning text and outline */
  } else {
    currentInputWarning.style.opacity = "0";
    currentInputWarning.innerHTML = "";
    currentInputField.classList.remove(inputWarningOutline);
  }


  /* If certain key was pressed (from invalidChars), ignore that letter */
  if (invalidChars.includes(event.key)){
    event.preventDefault();
    isInputOk[i] = 0;
  } else {
    isInputOk[i] = 1;
  }


  /* Display text about high numbers */
  if ((inputArray[i].value > 99999 && i == 0) ||
      (inputArray[i].value > 999 && i == 1) ||
      (inputArray[i].value > 99 && i == 2)) {
        currentInputWarning.style.opacity = "1";
        currentInputWarning.innerHTML = cantBeHigherText;
        /* When maximum numbers reached, allow only for deleting data */
        if (event.key !== "Backspace" &&
            event.key !== "Delete" &&
            event.key !== "ArrowLeft" &&
            event.key !== "ArrowRight"){
              event.preventDefault();
        }
  }
}


export function inputValidation(input, i){

  switch(i){
    case 0:
      inputData.bill.isValid = 1;
      inputData.bill.value = input.value;
      break;
    case 1:
      inputData.tip.isValid = 1;
      break;
    case 2:
      inputData.people.isValid = 1;
      inputData.people.value = input.value;
      break;
  }

}


export function inputValidationOld (el, i){


  const warningInfoBill = document.getElementById("warningInfo--bill");
  const warningInfoTip = document.getElementById("warningInfo--tip");
  const warningInfoPeople = document.getElementById("warningInfo--people");


  let currentInputWarning;
  let currentInputField;
  const regex = /\.\d{3}/;


  /* Assign data to input type currently active */
  switch (i) {
    case 0:
      currentInputWarning = warningInfoBill;
      currentInputField = inputBill;
      break;

    case 1:
      currentInputWarning = warningInfoTip;
      currentInputField = inputTip;
      /* If any tip was already enabled, diasble all of them (for mobiles) */
      if (isTipButtonEnabled == 1){
        buttonTipArray.forEach(el => el.classList.remove(buttonEnabled));
        isTipButtonEnabled = 0;
      }
      break;

    case 2:
      currentInputWarning = warningInfoPeople;
      currentInputField = inputPeople;
      break;
  }


  /* Only for mobiles */
  if (hasTouchScreen) {


    /* When hyphen was typed */
    if (event.data == "-") {
      currentInputWarning.innerHTML = mustBePositiveText;
      currentInputWarning.style.opacity = "1";
      currentInputField.classList.add(inputWarningOutline);
      isInputOk[i] = 0;
    }


    /* When dot (period) or comma was typed */
    else if ((event.data == "." ||
              event.data == "," ||
              inputArray[i].value.includes(".")) &&
              (i == 1 || i == 2)) {
      currentInputWarning.innerHTML = mustBeIntegerText;
      currentInputWarning.style.opacity = "1";
      currentInputField.classList.add(inputWarningOutline);
      isInputOk[i] = 0;
    }


    /* When is empty or contains a hyphen */
    else if (inputArray[i].value == "" && event.data != ".") {
      currentInputWarning.innerHTML = mustBeNumberText;
      currentInputWarning.style.opacity = "1";
      currentInputField.classList.add(inputWarningOutline);
      isInputOk[i] = 0;
    }


    /* When seems ok */
    else {
    currentInputWarning.style.opacity = "0";
    currentInputWarning.innerHTML = "";
    currentInputField.classList.remove(inputWarningOutline);
    isInputOk[i] = 1;
    }



    /* Display text about high numbers */
    if ((inputArray[i].value > 99999 && i == 0) ||
        (inputArray[i].value > 999 && i == 1) ||
        (inputArray[i].value > 99 && i == 2)) {
          currentInputWarning.style.opacity = "1";
          currentInputWarning.innerHTML = cantBeHigherText;
          isInputOk[i] = 0;
    }



  } else {

    /* If data is empty or is equal to zero, display text and outline */
    if (el.value == "" || el.value <= 0) {

      currentInputWarning.innerHTML = mustBePositiveText;
      currentInputWarning.style.opacity = "1";
      currentInputField.classList.add(inputWarningOutline);
      isInputOk[i] = 0;

    } else {

      currentInputWarning.style.opacity = "0";
      currentInputWarning.innerHTML = "";
      currentInputField.classList.remove(inputWarningOutline);
      isInputOk[i] = 1;
    }

  }


  if (regex.test(inputArray[i].value) && i == 0){

    currentInputWarning.innerHTML = decimalNumbersText;
    currentInputWarning.style.opacity = "1";
    currentInputField.classList.add(inputWarningOutline);
    isInputOk[i] = 0;

  }



}


export function updateResults() {


   /* If all data are complete, calcualate results */
  if (inputData.areAllValid()){

    calculateResults();
    console.log("1");

  /* If any data are incomplete, set results to $0 */
  } else {

    resetResults();
    console.log("2");

  }

}



export function calculateResults() {

  /** Calculate tip and total, with two decimal numbers **/
  /* e.g. tipFactor = 1.25 means 25% tip */
  const tipFactor = 1 + (inputData.tip.value) / 100;
  const resultTipNotRounded = ((inputData.bill.value * tipFactor) - inputData.bill.value) / inputData.people.value;

  resultTip.innerHTML = Math.round(resultTipNotRounded * 100) / 100;
  resultTotal.innerHTML = Math.round(inputData.bill.value * tipFactor / inputData.people.value * 100) / 100;


  /* When data are wrongly calculated /*/
  if (resultTip.innerHTML == "Infinity" ||
      resultTotal.innerHTML == "Infinity" ||
      resultTip.innerHTML == "NaN" ||
      resultTotal.innerHTML == "NaN"
    ) {
    resultTip.innerHTML = "0";
    resultTotal.innerHTML = "0";
   }


  /* When tip result is too long - compress to thousands (k) millions (M) */
  if (resultTip.innerHTML > 1000000){
    resultTip.innerHTML = Math.round(resultTip.innerHTML / 1000000 * 10) / 10 + "M";
  } else if (resultTip.innerHTML > 1000){
    resultTip.innerHTML = Math.round(resultTip.innerHTML / 1000 * 10) / 10 + "k";
  }


  /* Add dollar sign */
  resultTip.innerHTML = "$" + resultTip.innerHTML;


  /* When total result is too long - compress to thousands (k) millions (M) */
  if (resultTotal.innerHTML > 1000000){
    console.log("yes" + resultTotal.innerHTML);
    resultTotal.innerHTML = Math.round(resultTotal.innerHTML / 1000000 * 10) / 10 + "M";
  } else if (resultTotal.innerHTML > 1000){
    console.log("yes" + resultTotal.innerHTML);
    resultTotal.innerHTML = Math.round(resultTotal.innerHTML / 1000 * 10) / 10 + "k";
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
