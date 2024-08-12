import { algorithmPicker,  userInput, addValueButton, startAlgorithmButton} from "./buttons.js";
import { maxAmountOfRects, drawRect, drawStokeRect, drawFillRect } from "./drawLogic.js";
import { VisualBubbleSort } from "./VisualSorting.js";






var rectAmount = 0; 


var userInputArray = [];



function handleUserSubmit(){
    if(rectAmount < maxAmountOfRects){
        let userVal = userInput.value

        if(userVal != ""){
            drawRect(rectAmount, userVal, "red", "black", drawFillRect)
            rectAmount = rectAmount + 1;
            userInputArray.push(Number(userVal));
            userInput.value = "";
        }
    }
}


addValueButton.addEventListener("click", handleUserSubmit);

userInput.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        handleUserSubmit();
        
    }
}
);









function algorithmStarter(){
    switch(algorithmPicker.value){
        case "BubbleSort":
            VisualBubbleSort(userInputArray);

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



















