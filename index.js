var tipButton = document.querySelectorAll(".button--tip-percentage");


for (let i = 0; i < tipButton.length; i++){

  tipButton[i].addEventListener("click", enableStateTip);

    function enableStateTip (){

      if (this.classList.contains("button--tip-percentage--enabled")){
        this.classList.remove("button--tip-percentage--enabled");
      } else {
        this.classList.add("button--tip-percentage--enabled");
      }

    }
}

var resetButton = document.querySelector(".button--reset");

resetButton.addEventListener("click", enableStateReset);



  function enableStateReset (){

    if (this.classList.contains("button--reset--enabled")){
      this.classList.remove("button--reset--enabled");
    } else {
      this.classList.add("button--reset--enabled");
    }

  }
