/* Declaring letiables */
let inputBill = document.getElementById("input-bill");
let inputPeople = document.getElementById("input-people");
let inputArray = document.querySelectorAll(".input");
let buttonTipArray = document.querySelectorAll(".button--tip-percentage");
let isTipButtonEnabled = 0;
let resetButton = document.getElementById("button__reset");

let resultTip = document.getElementById("result-tip");
let resultTotal = document.getElementById("result-total");
let wasInputModified = [0, 0];

let tipFactor;

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


  });

});



/***** For both inputs *****/
inputArray.forEach(function(el, i) {


  /**** Validate after every keydown ****/
  el.addEventListener("keydown", function() {
    keydownValidation(el, i);
  });



  /**** Validate after losing focus ****/
  el.addEventListener("blur", function() {
    blurValidation(el, i);
  });



  /**** Calculate when input modifies ****/
  el.addEventListener("input", function(event) {


    /* Enable reset buton */
    enableResetButton();


    /* Update results (calculate or reset) */
    updateResults(el);


  });

});



/*** Resetting ***/
resetButton.addEventListener("click", function() {

  resetAll();

})


function tipButtonToggler(el) {

  if (el.classList.contains("button--tip-percentage--enabled")) {
    el.classList.remove("button--tip-percentage--enabled");
    isTipButtonEnabled = 0;
  } else if (isTipButtonEnabled == 1) {
    buttonTipArray.forEach(el => el.classList.remove("button--tip-percentage--enabled"));
    el.classList.add("button--tip-percentage--enabled");
  } else {
    el.classList.add("button--tip-percentage--enabled");
    isTipButtonEnabled = 1;
  }

}


function keydownValidation (el, i) {

  let regex = /[a-z]/i;
  let currentInput;

  if (el == inputArray[0]) {
    currentInput = document.getElementById("warning-info-bill");
  } else if (el == inputArray[1]) {
    currentInput = document.getElementById("warning-info-people");
  }

  currentInput.style.opacity = "1";
  wasInputModified[i] = 0;

  if (event.key == "," && i == 0) {
    currentInput.innerHTML = "Use period (.) operator";

  } else if ((event.key == "," || event.key == ".") && i == 1) {
    currentInput.innerHTML = "Must be an integer";

  } else if (event.key == "-") {
    currentInput.innerHTML = "Must be greater than zero";

  } else if (regex.test(event.key) &&
    event.key !== "Backspace" &&
    event.key !== "Delete" &&
    event.key !== "ArrowLeft" &&
    event.key !== "ArrowRight") {
    currentInput.innerHTML = "Must be a number";

  } else {
    currentInput.style.opacity = "0";
    currentInput.innerHTML = "";
    wasInputModified[i] = 1;
  }

}


function blurValidation (el, i) {

  let currentInput;

  if (i == 0) {
    currentInput = document.getElementById("warning-info-bill");
  } else if (i == 1) {
    currentInput = document.getElementById("warning-info-people");
  }

  currentInput.style.opacity = "1";
  console.log(Number(el.value));
  console.log(el.value)

  if (el.value.includes("-") == 0 && el.value == "") {
    currentInput.innerHTML = "Must be a number";
  } else if (el.value.includes(".") && i == 1) {
    currentInput.innerHTML = "Must be an integer";
  } else if (el.value < 0) {
    currentInput.innerHTML = "Must be greater than zero";
  } else {
    currentInput.style.opacity = "0";
    currentInput.innerHTML = "";
  }

}


function updateResults(el) {

  if (wasInputModified.every(el => el == 1) && isTipButtonEnabled == 1) {

    calculateTipFactor();
    calculateResults();

  } else if (wasInputModified.every(el => el == 0) && isTipButtonEnabled == 0) {

    /* Disable reset button if all inputs inactive */
    resetButton.classList.remove("button--reset--enabled");

  } else if (wasInputModified.some(el => el == 0) || isTipButtonEnabled == 0) {

    /* Set results to $0, if any input is incomplete */
    resetResults();

  }

}


function calculateTipFactor() {

  /* Calculate tip factor based on enabled tip button */
  buttonTipArray.forEach(function(el){
    if (el.classList.contains("button--tip-percentage--enabled")) {
      tipFactor = 1 + (el.value) / 100;
    }
  });

}


function calculateResults() {

  let resultTipNotRounded = ((inputBill.value * tipFactor) - inputBill.value) / inputPeople.value;
  resultTip.innerHTML = "$" + Math.round(resultTipNotRounded * 100) / 100;
  resultTotal.innerHTML = "$" + Math.round(inputBill.value * tipFactor / inputPeople.value * 100) / 100;

  if (resultTip.innerHTML == "$Infinity" || resultTotal.innerHTML == "$Infinity") {
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
  document.getElementById("input-people").value = "";
  document.getElementById("result-tip").innerHTML = "$" + 0;
  document.getElementById("result-total").innerHTML = "$" + 0;
  document.getElementById("warning-info-bill").innerHTML = "";
  document.getElementById("warning-info-people").innerHTML = "";

  /* Disable tip button */
  for (let i = 0; i < buttonTipArray.length; i++) {
    if (buttonTipArray[i].classList.contains("button--tip-percentage--enabled")) {
      buttonTipArray[i].classList.remove("button--tip-percentage--enabled");
    }
  }

  /* Disable reset button */
  resetButton.classList.remove("button--reset--enabled");

  /* Reset letiables */
  isTipButtonEnabled = 0;
  wasInputModified = [0, 0];

}
