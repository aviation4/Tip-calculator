
var inputBill = document.getElementById("input-bill");
var inputPeople = document.getElementById("input-people");

var buttonTipArray = document.querySelectorAll(".button--tip-percentage");
var resetButton = document.getElementById("button__reset");
var calculateButton = document.getElementById("button__calculate");


/**** Change << tip button >> states (and enable << reset button >>) ****/


/* For every << tip button >> */
for (let i = 0; i < buttonTipArray.length; i++){

  /* Assign Event Listener */
  buttonTipArray[i].addEventListener("click", function (){

    /* Disable all enabled < <tip buttons >> */
    for (let i = 0; i < buttonTipArray.length; i++){
      if (buttonTipArray[i].classList.contains("button--tip-percentage--enabled")){
        buttonTipArray[i].classList.remove("button--tip-percentage--enabled");
      }
    }

    /* Check if clicked << tip button >> was already enabled */
    var alreadyHas = 0;
    if (this.classList.contains("button--tip-percentage--enabled")){
      alreadyHas = 1;
    }

    /* Enable (is disabled) or diasble (if enabled) */
    if (alreadyHas == 0){
        this.classList.add("button--tip-percentage--enabled");
    } else {
      this.classList.remove("button--tip-percentage--enabled");
    }

    /* Enable << reset button >> */
    resetButton.classList.add("button--reset--enabled");
  });
}




/*** Enable << reset button >> (by pressing a key) ***/

document.addEventListener("keypress", function(event){

  var isButtonEnabled = 0;

  /* Checks if any button tip is enabled */
  for (let i = 0; i < buttonTipArray.length; i++){
    if (buttonTipArray[i].classList.contains("button--tip-percentage--enabled")){
      isButtonEnabled = 1;
    }
  }

  /* If any input has been modified, enable reset button */
  if (inputBill.value != "" || inputPeople.value != "" || isButtonEnabled == 1){
    resetButton.classList.add("button--reset--enabled");
  }

  /* Activating <<Calculate>> button */
  if (inputBill.value != "" && inputPeople.value != "" && isButtonEnabled === 1){
    calculateButton.classList.add("button--reset--enabled");
  }
  console.log(event);
  console.log(inputBill.value);
  console.log(inputPeople.value);

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
    for (let i = 0; i < buttonTipArray.length; i++){
      if (buttonTipArray[i].classList.contains("button--tip-percentage--enabled")){
        tipFactor = 1 + (buttonTipArray[i].value)/100;
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

  for (let i = 0; i < buttonTipArray.length; i++){
    if (buttonTipArray[i].classList.contains("button--tip-percentage--enabled")){
        buttonTipArray[i].classList.remove("button--tip-percentage--enabled");
    }
  }

  resetButton.classList.remove("button--reset--enabled");
  calculateButton.classList.remove("button--reset--enabled");
})
