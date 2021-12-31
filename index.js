/* Declaring variables */
var inputBill = document.getElementById("input-bill");
var inputPeople = document.getElementById("input-people");
var inputArray = document.querySelectorAll(".input");
var buttonTipArray = document.querySelectorAll(".button--tip-percentage");
var isTipButtonEnabled = 0;
var resetButton = document.getElementById("button__reset");

var resultTip = document.getElementById("result-tip");
var resultTotal = document.getElementById("result-total");
var wasInputModified = [0, 0];

var tipFactor;

var breakpoint = window.matchMedia("(min-width: 1400px)");



/*** When tip button is clicked
     (change tip button states //
     enable reset button //
     calculate results) ***/

/* For every tip button */
for (let i = 0; i < buttonTipArray.length; i++) {

  /* Assign Event Listener */
  buttonTipArray[i].addEventListener("click", function() {

    /* Check if clicked tip button was already enabled */
    var alreadyIsEnabled = 0;
    if (this.classList.contains("button--tip-percentage--enabled")) {
      alreadyIsEnabled = 1;
    }


    /* Disable all enabled tip buttons */
    for (let i = 0; i < buttonTipArray.length; i++) {
      if (buttonTipArray[i].classList.contains("button--tip-percentage--enabled")) {
        buttonTipArray[i].classList.remove("button--tip-percentage--enabled");
        isTipButtonEnabled = 0;
        break;
      }
    }


    /* Enable (if was already disabled) */
    if (alreadyIsEnabled == 0) {
      this.classList.add("button--tip-percentage--enabled");
      isTipButtonEnabled = 1;
    }


    /* Enable reset button */
    resetButton.classList.add("button--reset--enabled");


    /* Calculate when tip button toggle */
    /* If inputs are modified and tip button is enabled */
    if (wasInputModified.every(el => el == 1) && isTipButtonEnabled == 1) {


      /* Calculate tip factor based on enabled tip button */
      for (let i = 0; i < buttonTipArray.length; i++) {
        if (buttonTipArray[i].classList.contains("button--tip-percentage--enabled")) {
          tipFactor = 1 + (buttonTipArray[i].value) / 100;
          break;
        }
      }

      /* Calculate results */
      var resultTipNotRounded = ((inputBill.value * tipFactor) - inputBill.value) / inputPeople.value;
      resultTip.innerHTML = "$" + Math.round(resultTipNotRounded * 100) / 100;
      resultTotal.innerHTML = "$" + Math.round(inputBill.value * tipFactor / inputPeople.value * 100) / 100;



    } else if (wasInputModified.every(el => el == 0) && isTipButtonEnabled == 0) {
      /* Disable reset button if all inputs inactive */
      resetButton.classList.remove("button--reset--enabled");

    } else if (wasInputModified.some(el => el == 0) || isTipButtonEnabled == 0) {
      /* Set results to $0, if any input is incomplete */
      resultTip.innerHTML = "$" + "0";
      resultTotal.innerHTML = "$" + "0";

    }


  });
}




/**** Calculate when input modifies ****/
for (let i = 0; i < inputArray.length; i++) {

  inputArray[i].addEventListener("input", function(event) {

    wasInputModified[i] = 1;
    /* Enable reset buton */
    resetButton.classList.add("button--reset--enabled");

    var insertedSign = event.data;
    var hyphen = "-";
    var previousSigns = inputArray[i].value;
    console.log(insertedSign);
    console.log(event.key);
    console.log(event.data);

    if (insertedSign == hyphen || previousSigns.includes(hyphen)) {



    } else {



      /* If inputs are modified and tip button is enabled */
      if (wasInputModified.every(el => el == 1) && isTipButtonEnabled == 1) {

        /* Calculate tip factor based on enabled tip button */
        for (let i = 0; i < buttonTipArray.length; i++) {
          if (buttonTipArray[i].classList.contains("button--tip-percentage--enabled")) {
            tipFactor = 1 + (buttonTipArray[i].value) / 100;
          }
        }

        /* Calculate results */
        var resultTipNotRounded = ((inputBill.value * tipFactor) - inputBill.value) / inputPeople.value;
        resultTip.innerHTML = "$" + Math.round(resultTipNotRounded * 100) / 100;
        resultTotal.innerHTML = "$" + Math.round(inputBill.value * tipFactor / inputPeople.value * 100) / 100;

      }


    }


  });

}


if (breakpoint.matches) {
  document.getElementById("warning-info-bill").style.top = "-33px";
  document.getElementById("warning-info-people").style.top = "-33px";
} else {
  document.getElementById("warning-info-bill").style.top = "55px";
  document.getElementById("warning-info-people").style.top = "55px";
}


inputArray[0].addEventListener("keydown", function() {
  var regex = /[a-z]/i;
  console.log(event.key);
  alert(event.key);
  alert(event.code);
  if (event.key == ",") {
    document.getElementById("warning-info-bill").style.opacity = "1";
    document.getElementById("warning-info-bill").innerHTML = "Use period (.) operator";
  } else if (event.key == "-") {
    document.getElementById("warning-info-bill").style.opacity = "1";
    document.getElementById("warning-info-bill").innerHTML = "Must be greater than zero";
  } else if (regex.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Delete" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" ) {
    document.getElementById("warning-info-bill").style.opacity = "1";
    document.getElementById("warning-info-bill").innerHTML = "Must be a number";
  }
  else {
    document.getElementById("warning-info-bill").style.opacity = "0";
  }
});


inputArray[0].onkeydown = function() {
  alert(event.key);
  var regex = /[a-z]/i;
  if (event.key == ",") {
    document.getElementById("warning-info-bill").style.opacity = "1";
    document.getElementById("warning-info-bill").innerHTML = "Use period (.) operator";
  } else if (event.key == "-") {
    document.getElementById("warning-info-bill").style.opacity = "1";
    document.getElementById("warning-info-bill").innerHTML = "Must be greater than zero";
  } else if (regex.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Delete" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" ) {
    document.getElementById("warning-info-bill").style.opacity = "1";
    document.getElementById("warning-info-bill").innerHTML = "Must be a number";
  } else {
    document.getElementById("warning-info-bill").style.opacity = "0";
  }
}


inputArray[0].addEventListener("blur", function () {
      document.getElementById("warning-info-bill").style.opacity = "0";
})

inputArray[1].addEventListener("blur", function () {
      document.getElementById("warning-info-people").style.opacity = "0";
})




inputArray[0].onkeydown = function() {
  return event.code === "Backspace" ||
    event.code === "Delete" ||
    event.code === "ArrowLeft" ||
    event.code === "ArrowRight" ||
    event.code === "Period" ?
    true : !isNaN(Number(event.key));
}

inputArray[1].addEventListener("keydown", function() {
  var regex = /[a-z]/i;
  if (event.key == "," || event.key == ".") {
    document.getElementById("warning-info-people").style.opacity = "1";
    document.getElementById("warning-info-people").innerHTML = "Must be an integer"
  } else if (event.key == "-") {
    document.getElementById("warning-info-people").style.opacity = "1";
    document.getElementById("warning-info-people").innerHTML = "Must be greater than zero"
  } else if (regex.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Delete" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" ) {
    document.getElementById("warning-info-people").style.opacity = "1";
    document.getElementById("warning-info-people").innerHTML = "Must be a number";
  } else {
    document.getElementById("warning-info-people").style.opacity = "0";
  }
});

inputArray[1].onkeydown = function() {
  return event.code === "Backspace" ||
    event.code === "Delete" ||
    event.code === "ArrowLeft" ||
    event.code === "ArrowRight" ?
    true : !isNaN(Number(event.key));
}







/*** Resetting ***/
resetButton.addEventListener("click", function() {

  /* Reset input and result values */
  document.getElementById("input-bill").value = "";
  document.getElementById("input-people").value = "";
  document.getElementById("result-tip").innerHTML = "$" + 0;
  document.getElementById("result-total").innerHTML = "$" + 0;

  /* Disable tip button */
  for (let i = 0; i < buttonTipArray.length; i++) {
    if (buttonTipArray[i].classList.contains("button--tip-percentage--enabled")) {
      buttonTipArray[i].classList.remove("button--tip-percentage--enabled");
    }
  }

  /* Disable reset button */
  resetButton.classList.remove("button--reset--enabled");

  /* Reset variables */
  isTipButtonEnabled = 0;
  wasInputModified = [0, 0];
})
