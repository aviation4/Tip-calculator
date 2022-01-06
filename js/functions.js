/* Checks whether the user uses mobile device (true) or not (false) */
function checkTouchScreen (){


  if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
      var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
          hasTouchScreen = !!mQ.matches;
      } else if ('orientation' in window) {
          hasTouchScreen = true;
      }
  }

  return hasTouchScreen;

}


function tipButtonToggler(el) {


  /* If that element is alredy enabled, disable it */
  if (el.classList.contains(buttonTipEnabled)) {
    el.classList.remove(buttonTipEnabled);
    isTipButtonEnabled = 0;
  }
  /* If any other button is enabled, disable all of them and enable the new one */
  else if (isTipButtonEnabled == 1) {
    buttonTipArray.forEach(el => el.classList.remove(buttonTipEnabled));
    el.classList.add(buttonTipEnabled);
  }
  /* If all buttons are disabled, enable the new one */
  else {
    el.classList.add(buttonTipEnabled);
    isTipButtonEnabled = 1;
  }


  /* If user already entered custom value, reset it */
  if (inputTip.classList.contains(inputWarningOutline) || isInputOk[1] == 1){
    inputTip.value = "";
    inputTip.classList.remove(inputWarningOutline);
    warningInfoTip.innerHTML = "";
    isInputOk[1] = 0;
  }


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
        buttonTipArray.forEach(el => el.classList.remove(buttonTipEnabled));
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


function inputValidation (el, i){

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
        buttonTipArray.forEach(el => el.classList.remove(buttonTipEnabled));
        isTipButtonEnabled = 0;
      }
      break;

    case 2:
      currentInputWarning = warningInfoPeople;
      currentInputField = inputPeople;
      break;
  }


  /* Only for mobiles */
  if (checkTouchScreen ()) {


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


function updateResults() {


   /* If any data are incomplete, set results to $0 */
  if (isInputOk[0] == 0 ||
      isInputOk[2] == 0 ||
     (isInputOk[1] == 0 && isTipButtonEnabled == 0)) {

    resetResults();

  } else {

    calculateResults();

  }


}


function calculateTipFactor() {


  /* Calculate tip factor based on enabled button tip */
  if (isInputOk[1] == 0){

    buttonTipArray.forEach(function(el){

      if (el.classList.contains(buttonTipEnabled)) {
        tipFactor = 1 + (el.value) / 100;
      }

    });

  }

  /* Calculate tip factor based on custom tip value given by user */
  else if (isInputOk[1] == 1){
        tipFactor = 1 + (inputTip.value) / 100;
  }

  return tipFactor;

}


function calculateResults() {

  /* Calculate tip and total, with two decimal numbers */
  let resultTipNotRounded = ((inputBill.value * calculateTipFactor()) - inputBill.value) / inputPeople.value;
  resultTip.innerHTML = Math.round(resultTipNotRounded * 100) / 100;
  resultTotal.innerHTML = Math.round(inputBill.value * calculateTipFactor() / inputPeople.value * 100) / 100;


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


function enableResetButton() {

  resetButton.classList.add(buttonResetEnabled);

}


function resetResults() {

  resultTip.innerHTML = "$" + "0";
  resultTotal.innerHTML = "$" + "0";

}


function resetAll() {

  /* Reset input and result values */
  inputBill.value = "";
  inputTip.value = "";
  inputPeople.value = "";
  resultTip.innerHTML = "$" + 0;
  resultTotal.innerHTML = "$" + 0;
  warningInfoBill.innerHTML = "";
  warningInfoTip.innerHTML = "";
  warningInfoPeople.innerHTML = "";

  /* Disable tip button */
  buttonTipArray.forEach(el => el.classList.remove(buttonTipEnabled));


  /* Remove warning outlines */
  inputArray.forEach(el => el.classList.remove(inputWarningOutline));


  /* Disable reset button */
  resetButton.classList.remove(buttonResetEnabled);

  /* Reset variables */
  isTipButtonEnabled = 0;
  isInputOk.forEach((el, i) => isInputOk[i] = 0);
}


function isArrayEqual(a, b) {

  /* Compare if arrays "a" and "b" have the same elements */
  return a.length === b.length &&
         a.every((val, index) => val === b[index]);
}
