/* Declaring variables */
const inputBill = document.getElementById("input-bill");
const inputTip = document.getElementById("input-tip");
const inputPeople = document.getElementById("input-people");
const inputArray = [...document.querySelectorAll("input")];
/*const inputArray = document.querySelectorAll("input");*/
const buttonTipArray = document.querySelectorAll(".button--tip-percentage");
let isTipButtonEnabled = 0;
const resetButton = document.getElementById("button__reset");

const resultTip = document.getElementById("result-tip");
const resultTotal = document.getElementById("result-total");
const wasInputModified = [0, 0, 0];

let tipFactor;

let periodText = "Use period (.) operator";
let mustBeNumberText = "Must be a number";
let mustBeIntegerText = "Must be an integer";
let mustBePositiveText = "Must be greater than zero";


let breakpoint = window.matchMedia("(min-width: 1400px)");
if (breakpoint.matches) {
  document.getElementById("warning-info-bill").style.top = "-33px";
  document.getElementById("warning-info-people").style.top = "-33px";
} else {
  document.getElementById("warning-info-bill").style.top = "55px";
  document.getElementById("warning-info-people").style.top = "55px";
}




/***** For every tip button *****/
buttonTipArray.forEach(function(el, i) {

  /***** Assign Event Listener *****/
  el.addEventListener("click", function() {


    /* Enable or disable tip buttons */
    tipButtonToggler(el);


    /* Enable reset button */
    enableResetButton();


    /* Update results (calculate or reset) */
    updateResults(el);
    console.log(wasInputModified);

  });

});



/***** For both inputs *****/
inputArray.forEach(function(el, i) {


  /**** Validate every keydown ****/
  el.addEventListener("keydown", function() {
    wasInputModified[i] = 1;
    keydownValidation(el, i);
  });



  /**** Validate when losing focus ****/
    el.addEventListener("blur", function() {
    inputValidation(el, i);
  });



  /**** Calculate when input modifies ****/
  el.addEventListener("input", function(event) {
    console.log(wasInputModified);

    /* Validate inserted data */
    inputValidation(el, i);


    /* Enable reset buton */
    enableResetButton();


    /* Update results (calculate or reset) */
    updateResults();


  });

});



/*** Resetting ***/
resetButton.addEventListener("click", function() {

  resetAll();

})


function tipButtonToggler(el) {

  /* If that element is alredy enabled, disable it */
  if (el.classList.contains("button--tip-percentage--enabled")) {
    console.log("firsty");
    el.classList.remove("button--tip-percentage--enabled");
    isTipButtonEnabled = 0;
  }
  /* If any other button is enabled, disable all of them and enable the new one */
  else if (isTipButtonEnabled == 1) {
    console.log("second");
    buttonTipArray.forEach(el => el.classList.remove("button--tip-percentage--enabled"));
    el.classList.add("button--tip-percentage--enabled");
  }
  /* If all buttons are disabled, enable the new one */
  else {
    console.log("fourth");
    el.classList.add("button--tip-percentage--enabled");
    isTipButtonEnabled = 1;
  }

  /* If user already entered custom value, reset it */
  if (wasInputModified[1] == 1){
    console.log("third");
    document.getElementById("input-tip").value = "";
    wasInputModified[1] = 0;
  }

}


function keydownValidation (el, i) {

  let regex = /[a-z]/i;
  let currentInputWarning;
  let currentInputField;

  switch (i) {
    case 0:
      currentInputWarning = document.getElementById("warning-info-bill");
      currentInputField = inputBill;
      break;

    case 1:
      currentInputWarning = document.getElementById("warning-info-tip");
      currentInputField = inputTip;
      /* If any tip was already enabled, diasble all of them */
      if (isTipButtonEnabled == 1){
        console.log("washere");
        buttonTipArray.forEach(el => el.classList.remove("button--tip-percentage--enabled"));
        isTipButtonEnabled == 0;
      }
      break;

    case 2:
      currentInputWarning = document.getElementById("warning-info-people");
      currentInputField = inputPeople;
      break;
  }


  currentInputWarning.style.opacity = "1";
  currentInputField.classList.add("input__warning-outline");


  if (event.key == "," && i == 0) {
    currentInputWarning.innerHTML = periodText;

  } else if ((event.key == "," || event.key == ".") && (i == 1 || i == 2)) {
    currentInputWarning.innerHTML = mustBeIntegerText;
    console.log("wowprior");

  } else if (event.key == "-") {
    currentInputWarning.innerHTML = mustBePositiveText;

  } else if (regex.test(event.key) &&
    event.key !== "Backspace" &&
    event.key !== "Delete" &&
    event.key !== "ArrowLeft" &&
    event.key !== "ArrowRight" ||
    event.key == " ") {
    currentInputWarning.innerHTML = mustBeNumberText;

  } else {
    currentInputWarning.style.opacity = "0";
    currentInputWarning.innerHTML = "";
    currentInputField.classList.remove("input__warning-outline");
  }

}


function inputValidation (el, i){

  let currentInputWarning;
  let currentInputField;

  if (i == 0) {
    currentInputWarning = document.getElementById("warning-info-bill");
    currentInputField = inputBill;
  } else if (i == 1) {
    currentInputWarning = document.getElementById("warning-info-tip");
    currentInputField = inputTip;
  } else if (i == 2) {
    currentInputWarning = document.getElementById("warning-info-people");
    currentInputField = inputPeople;
  }

  currentInputWarning.style.opacity = "1";
  currentInputField.classList.add("input__warning-outline");

  console.log(el.value);
  if (el.value.includes("-") == 0 && el.value == "") {

    currentInputWarning.innerHTML = mustBeNumberText;

  } else if (el.value.includes(",") && i == 0){

    currentInputWarning.innerHTML = periodText;

  } else if (el.value.includes(".") && (i == 1 || i == 2)) {

    currentInputWarning.innerHTML = mustBeIntegerText;

  } else if (el.value < 0) {

    currentInputWarning.innerHTML = mustBePositiveText;

  } else {

    currentInputWarning.style.opacity = "0";
    currentInputWarning.innerHTML = "";
    currentInputField.classList.remove("input__warning-outline");
  }

}


function updateResults() {

  console.log(inputArray);


  /* User has entered Bill, Number of People and chose Tip button */
  if (isArrayEqual(wasInputModified, [1, 0, 1]) && isTipButtonEnabled == 1) {

    calculateResults();

  } else if (isArrayEqual(wasInputModified, [1, 1, 1]) && isTipButtonEnabled == 0){

    calculateResults();


  /* Every input/button is in default state */
  } else if (wasInputModified.every(el => el == 0) && isTipButtonEnabled == 0) {

    resetButton.classList.remove("button--reset--enabled");

  /* Some of data are incomplete */
  } else if (wasInputModified.some(el => el == 0) || isTipButtonEnabled == 0) {

    /* Set results to $0, if any input is incomplete */
    resetResults();

  /* When any warning text is active */
  } else if (inputArray.some(el => el.classList.includes("input__warning-outline"))){

    console.log("calculate5")
    resetResults();

   /* In any other case */
  } else {

    calculateResults();

  }



}


function calculateTipFactor() {


  /* Calculate tip factor depending on whether input tip was modified */
  if (wasInputModified[1] == 0){

    buttonTipArray.forEach(function(el){

      if (el.classList.contains("button--tip-percentage--enabled")) {
        tipFactor = 1 + (el.value) / 100;

      }


    });

  }

  else if (wasInputModified[1] == 1){

        tipFactor = 1 + (inputTip.value) / 100;

  }

  return tipFactor;

}


function calculateResults() {


  let resultTipNotRounded = ((inputBill.value * calculateTipFactor()) - inputBill.value) / inputPeople.value;
  console.log(calculateTipFactor());
  console.log(resultTipNotRounded);
  resultTip.innerHTML = "$" + Math.round(resultTipNotRounded * 100) / 100;
  resultTotal.innerHTML = "$" + Math.round(inputBill.value * calculateTipFactor() / inputPeople.value * 100) / 100;

  if (resultTip.innerHTML == "$Infinity" ||
      resultTotal.innerHTML == "$Infinity" ||
      resultTip.innerHTML == "$NaN" ||
      resultTotal.innerHTML == "$NaN"
    ) {
    resultTip.innerHTML = "$0";
    resultTotal.innerHTML = "$0";
   }

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
  return a.length === b.length &&
         a.every((val, index) => val === b[index]);
}
