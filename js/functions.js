function tipButtonToggler(el) {


  /* If that element is alredy enabled, disable it */
  if (el.classList.contains("button--tip-percentage--enabled")) {
    el.classList.remove("button--tip-percentage--enabled");
    isTipButtonEnabled = 0;
  }
  /* If any other button is enabled, disable all of them and enable the new one */
  else if (isTipButtonEnabled == 1) {
    buttonTipArray.forEach(el => el.classList.remove("button--tip-percentage--enabled"));
    el.classList.add("button--tip-percentage--enabled");
  }
  /* If all buttons are disabled, enable the new one */
  else {
    el.classList.add("button--tip-percentage--enabled");
    isTipButtonEnabled = 1;
  }


  /* If user already entered custom value, reset it */
  if (inputArray[1].classList.contains("input__warning-outline") || wasInputModified[1] == 1){
    document.getElementById("input-tip").value = "";
    inputArray[1].classList.remove("input__warning-outline");
    document.getElementById("warning-info-tip").innerHTML = "";
    wasInputModified[1] = 0;
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
      currentInputWarning = document.getElementById("warning-info-bill");
      currentInputField = inputBill;
      invalidChars = invalidCharsWithoutDot.slice();
      break;

    case 1:
      currentInputWarning = document.getElementById("warning-info-tip");
      currentInputField = inputTip;
      invalidChars = invalidCharsWithDot.slice();
      /* If any tip was already enabled, diasble all of them */
      if (isTipButtonEnabled == 1){
        buttonTipArray.forEach(el => el.classList.remove("button--tip-percentage--enabled"));
        isTipButtonEnabled = 0;
      }
      break;

    case 2:
      currentInputWarning = document.getElementById("warning-info-people");
      currentInputField = inputPeople;
      invalidChars = invalidCharsWithDot.slice();
      break;
  }


  /* Enable warning text and outline by default, will be disabld when everything is ok */
  currentInputWarning.style.opacity = "1";
  currentInputField.classList.add("input__warning-outline");


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
    currentInputField.classList.remove("input__warning-outline");
  }


  /* If certain key was pressed (from invalidChars), ignore that letter */
  if (invalidChars.includes(event.key)){
    event.preventDefault();
    wasInputModified[i] = 0;
  } else {
    wasInputModified[i] = 1;
  }


  /* Display text about high numbers */
  if ((inputArray[i].value > 99999 && i == 0) ||
      (inputArray[i].value > 999 && i == 1) ||
      (inputArray[i].value > 99 && i == 2)) {
        currentInputWarning.style.opacity = "1";
        currentInputWarning.innerHTML = cantBeHigher;
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


  /* Assign data to input type currently active */
  switch (i) {
    case 0:
      currentInputWarning = document.getElementById("warning-info-bill");
      currentInputField = inputBill;
      break;

    case 1:
      currentInputWarning = document.getElementById("warning-info-tip");
      currentInputField = inputTip;
      /* If any tip was already enabled, diasble all of them (for mobiles) */
      if (isTipButtonEnabled == 1){
        buttonTipArray.forEach(el => el.classList.remove("button--tip-percentage--enabled"));
        isTipButtonEnabled = 0;
      }
      break;

    case 2:
      currentInputWarning = document.getElementById("warning-info-people");
      currentInputField = inputPeople;
      break;
  }


  /* Only for mobiles */
  if (hasTouchScreen) {


    /* When hyphen was typed */
    if (event.data == "-") {
      currentInputWarning.innerHTML = mustBePositiveText;
      currentInputWarning.style.opacity = "1";
      currentInputField.classList.add("input__warning-outline");
      wasInputModified[i] = 0;
    }


    /* When dot (period) or comma was typed */
    else if ((event.data == "." ||
              event.data == "," ||
              inputArray[i].value.includes(".")) &&
              (i == 1 || i == 2)) {
      currentInputWarning.innerHTML = mustBeIntegerText;
      currentInputWarning.style.opacity = "1";
      currentInputField.classList.add("input__warning-outline");
      wasInputModified[i] = 0;
    }


    /* When is empty or contains a hyphen */
    else if (inputArray[i].value == "") {
      currentInputWarning.innerHTML = mustBeNumberText;
      currentInputWarning.style.opacity = "1";
      currentInputField.classList.add("input__warning-outline");
      wasInputModified[i] = 0;
    }


    /* When seems ok */
    else {
    currentInputWarning.style.opacity = "0";
    currentInputWarning.innerHTML = "";
    currentInputField.classList.remove("input__warning-outline");
    wasInputModified[i] = 1;
    }



    /* Display text about high numbers */
    if ((inputArray[i].value > 99999 && i == 0) ||
        (inputArray[i].value > 999 && i == 1) ||
        (inputArray[i].value > 99 && i == 2)) {
          currentInputWarning.style.opacity = "1";
          currentInputWarning.innerHTML = cantBeHigher;
          wasInputModified[i] = 0;
    }



  } else {

    /* If data is empty or is equal to zero, display text and outline */
    if (el.value == "" || el.value <= 0) {

      currentInputWarning.innerHTML = mustBePositiveText;
      currentInputWarning.style.opacity = "1";
      currentInputField.classList.add("input__warning-outline");
      wasInputModified[i] = 0;

    } else {

      currentInputWarning.style.opacity = "0";
      currentInputWarning.innerHTML = "";
      currentInputField.classList.remove("input__warning-outline");
      wasInputModified[i] = 1;
    }

  }

  if (i == 1 && wasInputModified[1] == 1){
    inputArray[1].innerHTML = inputArray[1].value + "%";
  }

}


function updateResults() {


   /* If any data are incomplete, set results to $0 */
  if (wasInputModified[0] == 0 ||
      wasInputModified[2] == 0 ||
     (wasInputModified[1] == 0 && isTipButtonEnabled == 0)) {

    resetResults();

  } else {

    calculateResults();

  }


}


function calculateTipFactor() {


  /* Calculate tip factor based on enabled button tip */
  if (wasInputModified[1] == 0){

    buttonTipArray.forEach(function(el){

      if (el.classList.contains("button--tip-percentage--enabled")) {
        tipFactor = 1 + (el.value) / 100;
      }

    });

  }

  /* Calculate tip factor based on custom tip value given by user */
  else if (wasInputModified[1] == 1){
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
    console.log("yes" + resultTip.innerHTML);
    resultTip.innerHTML = Math.round(resultTip.innerHTML / 1000000 * 10) / 10 + "M";
  } else if (resultTip.innerHTML > 1000){
    console.log("yes" + resultTip.innerHTML);
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

  resetButton.classList.add("button--reset--enabled");

}


function resetResults() {

  resultTip.innerHTML = "$" + "0";
  resultTotal.innerHTML = "$" + "0";

}


function resetAll() {

  /* Reset input and result values */
  document.getElementById("input-bill").value = "";
  document.getElementById("input-tip").value = "";
  document.getElementById("input-people").value = "";
  document.getElementById("result-tip").innerHTML = "$" + 0;
  document.getElementById("result-total").innerHTML = "$" + 0;
  document.getElementById("warning-info-bill").innerHTML = "";
  document.getElementById("warning-info-tip").innerHTML = "";
  document.getElementById("warning-info-people").innerHTML = "";

  /* Disable tip button */
  buttonTipArray.forEach(el => el.classList.remove("button--tip-percentage--enabled"));


  /* Remove warning outlines */
  inputArray.forEach(el => el.classList.remove("input__warning-outline"));


  /* Disable reset button */
  resetButton.classList.remove("button--reset--enabled");

  /* Reset variables */
  isTipButtonEnabled = 0;
  wasInputModified.forEach((el, i) => wasInputModified[i] = 0);
}


function isArrayEqual(a, b) {

  /* Compare if arrays "a" and "b" have the same elements */
  return a.length === b.length &&
         a.every((val, index) => val === b[index]);
}
