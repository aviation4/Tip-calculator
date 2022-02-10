export const inputData = {

  bill: {
    isValid: 0,
    value: 0
  },


  tip: {
    isValid: 0,
    value: 0,
    /* tipStateArray can take two values: "0" - button/input is disabled, "1" - button/input is enabled */
    tipStateArray: [0, 0, 0, 0, 0, 0]
  },


  people: {
    isValid: 0,
    value: 0
  },



  areAllValid(){

    return ((this.bill.isValid && this.tip.isValid && this.people.isValid) ? true : false)

  }


}


/**** Class names ****/
export const inputWarningOutline = "input--warning";
export const buttonEnabled = "button--enabled";


/**** DOM elements ****/

/* tipDOMArray and tipStateArray have 6 elements, successively: buttons "5%", "10%", "15%", "25%", "50%" and input "Custom" */
export const tipDOMArray = document.querySelectorAll(".button--tipButton");
export const inputsDOMArray = [document.getElementById("input--bill"), document.getElementById("input--tip"), document.getElementById("input--people")];
export const resetButton = document.getElementById("button--reset");
export const resultTip = document.getElementById("results--tip");
export const resultTotal = document.getElementById("results--total");
