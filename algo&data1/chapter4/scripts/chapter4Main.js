import { algorithmPicker,  userInput, addValueButton, startAlgorithmButton, resetButton} from "./buttons.js";
import { maxAmountOfRects, drawRect, drawStokeRect, drawFillRect } from "./drawLogic.js";
import { VisualBubbleSort, VisualInsertionSort, VisualSelectionSort, VisualQuickSort } from "./VisualSorting.js";








var userInputArray = [];



var rectAmount = 0; 

resetButton.addEventListener("click", ()=>{
    rectAmount = 0;
    userInputArray = [];
});



function handleUserSubmit(){
    if(rectAmount < maxAmountOfRects){
        let userVal = userInput.value;

        if(userVal != ""){
            drawRect(rectAmount, userVal, "red", "black", drawFillRect);
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









async function algorithmStarter(){
    switch(algorithmPicker.value){
        case "BubbleSort":
            await VisualBubbleSort(userInputArray);

        case "InsertionSort":
            await VisualInsertionSort(userInputArray);

        case "SelectionSort":
            await VisualSelectionSort(userInputArray);

        case "QuickSort":
            await VisualQuickSort(userInputArray);
    
        case "MergeSort":
            return 0;
                
        case "Heapsort":
            return 0;
    }
}



startAlgorithmButton.addEventListener("click", algorithmStarter);



















