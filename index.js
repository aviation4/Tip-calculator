
var inputBill = document.getElementById("input-bill").value;
var inputPeople = document.getElementById("input-people").value;
var calculateButton = document.getElementById("button__calculate");



/**** Changes <<tip button>> states (and enabling reset button) ****/

var buttonTipElement = document.querySelectorAll(".button--tip-percentage");
var resetButton = document.getElementById("button__reset");

/* Assign Event Listener */
for (let i = 0; i < buttonTipElement.length; i++){

  buttonTipElement[i].addEventListener("click", function (){

    var alreadyHas = 0;
    if (this.classList.contains("button--tip-percentage--enabled")){
      alreadyHas = 1;
    }

    for (let i = 0; i < buttonTipElement.length; i++){
      if (buttonTipElement[i].classList.contains("button--tip-percentage--enabled")){
        buttonTipElement[i].classList.remove("button--tip-percentage--enabled");
      }
    }

    if (alreadyHas == 0){
        this.classList.add("button--tip-percentage--enabled");
    } else {
      this.classList.remove("button--tip-percentage--enabled");
    }


    resetButton.classList.add("button--reset--enabled");
  });
}





/*** Activating <<Reset button>> (by pressing a key) ***/

var resetButton = document.getElementById("button__reset");
document.addEventListener("keydown", function(){

  /* Actualise input values */
  inputBill = document.getElementById("input-bill").value;
  inputPeople = document.getElementById("input-people").value;

  var isButtonEnabled = 0;

  /* Check if any button tip is enabled */
  for (let i = 0; i < buttonTipElement.length; i++){
    if (buttonTipElement[i].classList.contains("button--tip-percentage--enabled")){
      isButtonEnabled = 1;
    }
  }

  /* If any input has been modified, enable reset button */
  if (inputBill != "undefined" || inputPeople != "undefined" || isButtonEnabled == 1){
    resetButton.classList.add("button--reset--enabled");
  }

  /* Activating <<Calculate>> button */
  if (inputBill != "undefined" && inputPeople != "undefined" && isButtonEnabled === 1){
    calculateButton.classList.add("button--reset--enabled");
  }
});







/**** Calculates when <<Calculate>> button is being pressed ****/

var buttonCalculate = document.getElementById("button__calculate");
buttonCalculate.addEventListener("click", calculateData);


function calculateData (){

  if (buttonCalculate.classList.contains("button--reset--enabled")){
    /* Actualise input values */
    var inputBill = document.getElementById("input-bill").value;
    var inputPeople = document.getElementById("input-people").value;

    /* Check if any button tip is enabled and save its value */
    var tipFactor = 1;
    for (let i = 0; i < buttonTipElement.length; i++){
      if (buttonTipElement[i].classList.contains("button--tip-percentage--enabled")){
        tipFactor = 1 + (buttonTipElement[i].value)/100;
      }
    }

    var resultTip = document.getElementById("result-tip");
    var resultTotal = document.getElementById("result-total");

    var resultTipNotRounded = ((inputBill*tipFactor) - inputBill)/inputPeople;
    resultTip.innerHTML = "$" + Math.round(resultTipNotRounded*100)/100;
    resultTotal.innerHTML = "$" + Math.round(inputBill*tipFactor/inputPeople*100)/100;
  }

}



/*** Resetting ***/
var resetButton = document.getElementById("button__reset");
resetButton.addEventListener("click", function(){

  document.getElementById("input-bill").value = "";
  document.getElementById("input-people").value= "";
  document.getElementById("result-tip").innerHTML = "$" + 0;
  document.getElementById("result-total").innerHTML = "$" + 0;

  for (let i = 0; i < buttonTipElement.length; i++){
    if (buttonTipElement[i].classList.contains("button--tip-percentage--enabled")){
        buttonTipElement[i].classList.remove("button--tip-percentage--enabled");
    }
  }

  resetButton.classList.remove("button--reset--enabled");
  calculateButton.classList.remove("button--reset--enabled");
})
