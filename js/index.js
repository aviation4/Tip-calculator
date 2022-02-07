import {tipButtonToggler} from "./functions.js";
import {inputData} from "./variables.js";


inputData.tip.tipDOMArray.forEach((button, i) => {

  /***** Assign Event Listener *****/
  button.addEventListener("click", function() {


    /* Enable or disable tip buttons */
    tipButtonToggler(button, i);


    /* Enable reset button */
    /*enableResetButton();*/


    /* Update results (calculate or reset) */
    /*updateResults(button);*/


  });

})

/* Input data */
const inputBill = document.getElementById("input--bill");
const inputTip = document.getElementById("input--tip");
const inputPeople = document.getElementById("input--people");
const buttonTipArray = document.querySelectorAll(".button--tipButton");

/* Warnings */
const warningInfoBill = document.getElementById("warningInfo--bill");
const warningInfoTip = document.getElementById("warningInfo--tip");
const warningInfoPeople = document.getElementById("warningInfo--people");


/* Results */
const resetButton = document.getElementById("button--reset");
const resultTip = document.getElementById("results--tip");
const resultTotal = document.getElementById("results--total");
let tipFactor = 0;


/* isTipButtonEnabled monitors whether any tip button is enabled (true) or none of them (false) */
let isTipButtonEnabled = 0;

/* hasTouchScreen handles info about using mobile device (true) or not (false) */
let hasTouchScreen = false;

/**** Declaring arrays ****/
const inputArray = [...document.querySelectorAll("input")];

/* isInputOk monitors inputs (bill, tip, number of people) whether data are entered AND are correct */
const isInputOk = new Array (0, 0, 0);


const invalidCharsWithDot = new Array("-", "+", "e", ",", ".");
const invalidCharsWithoutDot = new Array ("-", "+", "e", ",");



/**** Warning texts ****/
const periodText = "Use period (.) operator";
const mustBeNumberText = "Must be a number";
const mustBeIntegerText = "Must be a whole number";
const mustBePositiveText = "Must be greater than zero";
const cantBeHigherText = "Don't you have enough?";
const decimalNumbersText = "Too many decimal numbers";






/* Checks whether the user uses mobile device (true) or not (false) */
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






/***** For every tip button *****/
buttonTipArray.forEach(function(el, i) {



});



/***** For every input *****/
inputArray.forEach(function(el, i) {


  /* Validate for desktops */
  if(!(hasTouchScreen)) {

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
