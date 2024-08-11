import { algorithmPicker,  userInput, addValueButton, startAlgorithmButton} from "./buttons.js";
import { maxAmountOfRects, drawRect, drawStokeRect } from "./drawLogic.js";






var rectAmount = 0; 


var userInputArray = [];



function handleUserSubmit(){
    if(rectAmount < maxAmountOfRects){
        let userVal = userInput.value
        drawRect(rectAmount, userVal, "black", "black", drawStokeRect)
        rectAmount = rectAmount + 1;
        userInputArray.push(Number(userVal));
    }
}


addValueButton.addEventListener("click", handleUserSubmit);










function algorithmStarter(){
    switch(algorithmPicker.value){
        case "BubbleSort":
            return 0;

        case "InsertionSort":
            return 0;

        case "SelectionSort":
            return 0;

        case "QuickSort":
            return 0;
    
        case "MergeSort":
            return 0;
                
        case "Heapsort":
            return 0;
    }
}



startAlgorithmButton.addEventListener("click", algorithmStarter);



















