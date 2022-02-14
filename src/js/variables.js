export const inputData = {

  /* tipStateArray can take two values: "0" - button/input is disabled, "1" - button/input is enabled */
  tipStateArray: [0, 0, 0, 0, 0, 0],

  tipValue: 0,

  /* inputValidityArray can take two values: "0" - input datum is invalid, "1" - input datum is valid,
  elements successively refer to: [bill, tip, number of people] */
  inputValidityArray: [0, 0, 0],


  areAllValid(){

    return ((this.inputValidityArray.every((el) => el == 1)) ? true : false)

  }

}


/**** Class names ****/
export const inputWarningOutline = "input--warning";
export const buttonEnabled = "button--enabled";


/**** DOM elements ****/
/* tipDOMArray and inputData.tipStateArray have 6 elements, successively: buttons "5%", "10%", "15%", "25%", "50%" and input "Custom" */
export const tipDOMArray = document.querySelectorAll(".button--tipButton");
export const inputsDOMArray = [document.getElementById("input--bill"), document.getElementById("input--tip"), document.getElementById("input--people")];
export const warningInfoDOMArray = [document.getElementById("warningInfo--bill"), document.getElementById("warningInfo--tip"), document.getElementById("warningInfo--people")];
export const resetButton = document.getElementById("button--reset");
export const resultTip = document.getElementById("results--tip");
export const resultTotal = document.getElementById("results--total");