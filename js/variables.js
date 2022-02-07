export const inputData = {

  bill: {
    isValid: 0,
    value: 0,
    billDOM: document.getElementById("input--bill")
  },

  tip: {
    isValid: 0,
    value: 0,

    /* tipDOMArray and tipStateArray have 6 elements, successively: buttons "5%", "10%", "15%", "25%", "50%" and input "Custom" */
    tipDOMArray: document.querySelectorAll(".button--tipButton"),
    /* tipStateArray can take two values: "0" - button/input is disabled, "1" - button/input is enabled */
    tipStateArray: [0, 0, 0, 0, 0, 0]

  },

  people: {
    isValid: 1,
    value: 0,
    peopleDOM: document.getElementById("input--people")
  },


  areAllValid(){

    return ((this.bill.isValid && this.tip.isValid && this.people.isValid) ? true : false)

  }

}

/**** Class names ****/
const inputWarningOutline = "input--warning";
export const buttonEnabled = "button--enabled";
