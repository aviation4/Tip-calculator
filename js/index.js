/**** Declaring variables ****/

/* Input data */
const inputBill = document.getElementById("input-bill");
const inputTip = document.getElementById("input-tip");
const inputPeople = document.getElementById("input-people");
const buttonTipArray = document.querySelectorAll(".button--tip-percentage");

/* Warnings */
const warningInfoBill = document.getElementById("warning-info-bill");
const warningInfoTip = document.getElementById("warning-info-tip");
const warningInfoPeople = document.getElementById("warning-info-people");


/* Results */
const resetButton = document.getElementById("button__reset");
const resultTip = document.getElementById("result-tip");
const resultTotal = document.getElementById("result-total");
let tipFactor = 0;


/* isTipButtonEnabled monitors whether any tip button is enabled (true) or none of them (false) */
let isTipButtonEnabled = 0;

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


/**** Class names ****/
inputWarningOutline = "input__warning-outline";
buttonTipEnabled = "button--tip-percentage--enabled";
buttonResetEnabled = "button--reset--enabled";


checkTouchScreen ();


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
