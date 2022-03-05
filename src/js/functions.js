import {inputData, inputWarningOutline, buttonEnabled, resetButton, resultTip, resultTotal, tipDOMArray, inputsDOMArray, warningInfoDOMArray, currencyInfo, currencyButton, currencyModule, currencyArray, currencyUser} from "./variables.js";


export const tipButtonToggler = (button, i) => {


  /* If the pressed button is already enabled  (except from "Custom" input) */
  if (inputData.tipStateArray[i] == 1 && i != 5){

    /* disable it */
    button.classList.remove(buttonEnabled);
    inputData.tipStateArray[i] = 0;
    inputData.inputValidityArray[1] = 0;
    inputData.tipValue = 0;

  }

  /* If any other button is enabled AND it isn't pressed custom input with already provided value */
  else if (inputData.tipStateArray.some(value => value == 1) && !(inputData.tipStateArray[5] == 1 && i == 5)){

    /* disable it */
    tipDOMArray.forEach(button => button.classList.remove(buttonEnabled));
    /* Clean custom input, but only when button is pressed */
    if (i != 5){
      inputsDOMArray[1].value = "";
    }
    inputData.tipValue = 0;
    inputData.inputValidityArray[1] = 0;
    inputData.tipStateArray.forEach((element, index, array) => array[index] = 0);


    /* and enable pressed button */
    if (i != 5){
      button.classList.add(buttonEnabled);
      inputData.tipStateArray[i] = 1;
      inputData.inputValidityArray[1] = 1;
      inputData.tipValue = tipDOMArray[i].value;
    }


  }

  /* If all buttons are disabled*/
  else if (inputData.tipStateArray.every(value => value == 0)) {

    /* and enable pressed button */
    if (i != 5){
      button.classList.add(buttonEnabled);
      inputData.tipStateArray[i] = 1;
      inputData.inputValidityArray[1] = 1;
      inputData.tipValue = tipDOMArray[i].value;
    }


  }

}


export const enableResetButton = () => {

    resetButton.classList.add(buttonEnabled);

}


export const determineCustomTipValue = () => {
  inputData.tipValue = inputsDOMArray[1].value;
}


export const resetAll = () => {


  inputsDOMArray.forEach(el => el.value = "");
  inputsDOMArray.forEach(el => el.classList.remove(inputWarningOutline));
  tipDOMArray.forEach(el => el.classList.remove(buttonEnabled));


  inputData.tipStateArray.forEach(el => el = 0);
  inputData.inputValidityArray.forEach(el => el = 0);
  inputData.tipValue = 0;
  inputData.currencyState = 0;
  inputData.currencyRate = 1;


  resultTip.innerHTML = "€" + 0;
  resultTotal.innerHTML = "€" + 0;
  warningInfoDOMArray.forEach(el => el.textContent = "");

  currencyButton.style.display = "inline-block";
  currencyModule.style.display = "none";
  currencyInfo.style.display = "none";


  resetButton.classList.remove(buttonEnabled);

}


export const inputValidation = (input, i) => {


  if (input.validity.valid){
    warningInfoDOMArray[i].style.display = "none";
    input.classList.remove(inputWarningOutline);
    inputData.inputValidityArray[i] = 1;
    if (i == 1){
      inputData.tipStateArray[5] = 1;
    }
  } else {
    showError(input, i);
  }

}


const showError = (input, i) => {

  inputData.inputValidityArray[i] = 0;
  warningInfoDOMArray[i].style.display = "inline-block";

  if (input.validity.rangeOverflow){
    warningInfoDOMArray[i].textContent = "Too big numbo bro";
  } else if (input.validity.rangeUnderflow){
    warningInfoDOMArray[i].style.display = "inline-block";
    warningInfoDOMArray[i].textContent = "No negative numbos bro";
  } else if (input.validity.badInput){
    warningInfoDOMArray[i].textContent = "Please only numbos bro";
  } else if (input.validity.stepMismatch){
    warningInfoDOMArray[i].textContent = "Please type a whole number";
  }

}


export const updateResults = () => {


  /* If all data are complete, calcualate results */
  if (inputData.areAllValid()){

    calculateResults();

  /* If any data are incomplete, set results to €0 */
  } else {

    resetResults();

  }

}



export const calculateResults = () => {

  /* Calculating to user currency */
  const billUserCurrency = inputsDOMArray[0].value * inputData.currencyRate;

  /** Calculate tip and total, with two decimal numbers **/
  /* e.g. tipFactor = 1.25 means 25% tip */
  const tipFactor = 1 + (inputData.tipValue) / 100;
  const resultTipNotRounded = ((billUserCurrency * tipFactor) - billUserCurrency) / inputsDOMArray[2].value;
  resultTip.innerHTML = (Math.round(resultTipNotRounded * 100) / 100);
  resultTotal.innerHTML = (Math.round(billUserCurrency * tipFactor / inputsDOMArray[2].value * 100) / 100);


  /* When data are wrongly calculated /*/
  if (resultTip.innerHTML == "Infinity" ||
      resultTotal.innerHTML == "Infinity" ||
      resultTip.innerHTML == "NaN" ||
      resultTotal.innerHTML == "NaN"
    ) {
    resultTip.innerHTML = "0";
    resultTotal.innerHTML = "0";
   }



  /* When tip result is too long - compress to thousands (k) millions (M) */
  if (resultTip.innerHTML > 100000000){
    resultTip.innerHTML = "mного";
  } else if (resultTip.innerHTML > 1000000){
    resultTip.innerHTML = Math.round(resultTip.innerHTML / 1000000 * 100 ) / 100  + "M";
  } else if (resultTip.innerHTML > 10000){
    resultTip.innerHTML = Math.round(resultTip.innerHTML / 1000 * 100) / 100 + "k";
  }


  /* Add currency sign */
  resultTip.innerHTML = inputData.currencySymbols[inputData.currencyState] + resultTip.innerHTML;


  /* When total result is too long - compress to thousands (k) millions (M) */
  if (resultTotal.innerHTML > 100000000){
    resultTotal.innerHTML = "mного";
  } else if (resultTotal.innerHTML > 1000000){
    resultTotal.innerHTML = Math.round(resultTotal.innerHTML / 1000000 * 100) / 100 + "M";
  } else if (resultTotal.innerHTML > 10000){
    resultTotal.innerHTML = Math.round(resultTotal.innerHTML / 1000 * 100) / 100 + "k";
  }


  /* Add currency sign */
  resultTotal.innerHTML =  inputData.currencySymbols[inputData.currencyState] + resultTotal.innerHTML;


  /* Smaller font size to avoid breaking the layout */
  while (resultTip.offsetWidth > 135 || resultTotal.offsetWidth > 135){

    const resultTipFontSize = window.getComputedStyle(resultTip).getPropertyValue("font-size");
    console.log(resultTipFontSize);
    const resultTipShort = resultTipFontSize.slice(0, resultTipFontSize.length - 2);
    console.log(resultTipShort);
    const resultTipFontSizeNew = resultTipShort - 1 + "px";
    console.log(resultTipFontSizeNew);
    resultTip.style.fontSize = resultTipFontSizeNew;


    const resultTotalFontSize = window.getComputedStyle(resultTotal).getPropertyValue("font-size");
    console.log(resultTotalFontSize);
    const resultTotalShort = resultTotalFontSize.slice(0, resultTotalFontSize.length - 2);
    console.log(resultTotalShort);
    const resultTotalFontSizeNew = resultTotalShort - 1 + "px";
    console.log(resultTotalFontSizeNew);
    resultTip.style.fontSize = resultTotalFontSizeNew;

    setTimeout(() => calculateResults, 500);


  }

/*
  if ((resultTip.innerHTML.length > 10 || resultTotal.innerHTML.length > 10)  &&  window.screen.width < 400){
    resultTip.style.fontSize = "0.8em";
    resultTotal.style.fontSize = "0.8em";
  } else if ((resultTip.innerHTML.length > 10 || resultTotal.innerHTML.length > 10)  &&  window.screen.width < 450) {
    resultTip.style.fontSize = "1em";
    resultTotal.style.fontSize = "1em";
  } else if ((resultTip.innerHTML.length > 8 || resultTotal.innerHTML.length > 8)  &&  window.screen.width < 400){
    resultTip.style.fontSize = "1em";
    resultTotal.style.fontSize = "1em";
  } else {
    resultTip.style.fontSize = "1.2em";
    resultTotal.style.fontSize = "1.2em";
  }*/



}



const resetResults = () => {

  resultTip.innerHTML = "€" + "0";
  resultTotal.innerHTML = "€" + "0";

}


export const enableCurrencyModule = () => {

  currencyButton.style.display = "none";
  currencyModule.style.display = "flex";


}



export const retrieveAPI = async (currencyBill, currencyUser) => {


  const apiKey = "8a3dafc6208f3fb608102288354dfcc672db22bf";
  const url = `https://api.getgeoapi.com/v2/currency/convert?api_key=${apiKey}&from=${currencyBill}&to=${currencyUser}&amount=1&format=json`;

  try {
    const response = await fetch(url);
    if (response.ok){

      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error){
    console.log(error);
  }

}


export const renderCurrency = jsonResponse => {

  const billCurrency = currencyArray[0].value;
  const myCurrency = currencyArray[1].value;
  const rate = Object.values(jsonResponse.rates)[0].rate;
  const roundRate = Math.round(rate * 100)/100;
  const date = jsonResponse.updated_date;
  inputData.currencyRate = rate;

  determineCurrencySymbol();

  currencyInfo.style.display = "inline-block";
  currencyInfo.innerHTML = `1 ${billCurrency} = ${roundRate} ${myCurrency} (${date})`;

}


export const determineCurrencySymbol = () => {

  switch(currencyUser.value){
    case "GBP":
      inputData.currencyState = 0;
      break;

    case "EUR":
      inputData.currencyState = 1;
      break;

    case "JPY":
      inputData.currencyState = 2;
      break;

    case "PLN":
      inputData.currencyState = 3;
      break;

    case "CHF":
      inputData.currencyState = 4;
      break;

    case "UAH":
      inputData.currencyState = 5;
      break;

    case "USD":
      inputData.currencyState = 6;
      break;

    case "VUV":
      inputData.currencyState = 7;
      break;

  }

}
