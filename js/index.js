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

const invalidCharsWithDot = ["-", "+", "e", ",", "."];
const invalidCharsWithoutDot = ["-", "+", "e", ","];

let tipFactor;

let periodText = "Use period (.) operator";
let mustBeNumberText = "Must be a number";
let mustBeIntegerText = "Must be an integer";
let mustBePositiveText = "Must be greater than zero";
let cantBeHigher = "Don't you have enough?";


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



/***** For every input *****/
inputArray.forEach(function(el, i) {


  if((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    alert("mobile");

  } else {

    /**** Validate every keydown ****/
    el.addEventListener("keydown", function() {
      keydownValidation(el, i);
    });

  }




  /**** Validate when losing focus ****/
    el.addEventListener("blur", function() {
    inputValidation(el, i);
  });



  /**** Calculate when input modifies ****/
  el.addEventListener("input", function(event) {


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
