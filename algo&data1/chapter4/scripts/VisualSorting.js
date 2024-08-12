
import { resetButton, executionSlider, backButton, pauseButton, changeSliderValue } from "./buttons.js";
import { drawStokeRect, drawFillRect, drawRect, drawIndexText, clearIndexText } from "./drawLogic.js";



const defaultFunctionExecutionSpeed = 2000;
var executionSpeedFactor = executionSlider.valuel;



function UpdateExecutionSpeed() {
    let sliderValue = executionSlider.value;
    changeSliderValue(`x${sliderValue}`);
    console.log(sliderValue);
    executionSpeedFactor = sliderValue;
}

executionSlider.addEventListener("input", UpdateExecutionSpeed);





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}






var outputArray = [];



function stepVisualiser(idx1, idx2, rectColor, textColor, drawRectFunc, array){
    drawRect(idx1, array[idx1], rectColor, textColor, drawRectFunc);
    drawRect(idx2, array[idx2], rectColor, textColor, drawRectFunc);
}

export async function VisualBubbleSort(arrayToSort){

    var unsorted_idx = arrayToSort.length - 2;
    var inner_idx = 0;
    var has_changed = false;

    async function bubble_swap(idx1, idx2){


        let keep = arrayToSort[idx1];
        arrayToSort[idx1] = arrayToSort[idx2];
        arrayToSort[idx2] = keep;

        stepVisualiser(idx1, idx2, "grey", "black", drawFillRect, arrayToSort);

        await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);

        stepVisualiser(idx1, idx2, "red", "black", drawFillRect, arrayToSort);
        await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
        
        return true;
    }

    async function inner_loop(){
        /*
        drawIndexText(inner_idx, "inner idx", "purple");
        drawIndexText(unsorted_idx, "unsorted idx", "green");
        clearIndexText(inner_idx);
        clearIndexText(unsorted_idx);
        */


        if(inner_idx > unsorted_idx){
            drawRect(unsorted_idx, arrayToSort[unsorted_idx], "green", "black", drawFillRect);
            await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
            outputArray.push("outer");
            outputArray.push(has_changed);
            return 0;
        }
        else{
            outputArray.push("inner");

            //new value for inner_idx
            outputArray.push(inner_idx + 1);


            //new value for has_changed
            stepVisualiser(inner_idx, inner_idx + 1, "grey", "black", drawFillRect, arrayToSort);
            await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);

            if(arrayToSort[inner_idx + 1] < arrayToSort[inner_idx]){

                stepVisualiser(inner_idx, inner_idx + 1, "purple", "black", drawFillRect, arrayToSort);
                await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);

                outputArray.push(await bubble_swap(inner_idx, inner_idx + 1));
                return 0;
            }
            else{
                outputArray.push(has_changed);
                return 0;
            }
        }
    }




    outputArray.push("begin");
    
    
    while(true){
        let loopToRun = outputArray[0];

        if(loopToRun === "begin"){
            if(unsorted_idx >= 0){
                outputArray = [];
                outputArray.push("inner");
                outputArray.push(0);
                outputArray.push(false);
            }
            else{
                console.log("empty array");
                return 0;
            }
        }


        else if(loopToRun === "outer"){
            if(outputArray[1]){
                unsorted_idx = unsorted_idx - 1;
                outputArray = [];
                if(unsorted_idx >= 0){
                    outputArray.push("inner");
                    outputArray.push(0);
                    outputArray.push(false);
                }
                else{
                    console.log("unsorted idx < 0");
                    return 0;
                }
            }
            else{
                console.log("nothing changed in this iteration");
                return 0;
            }
        }
        else if(loopToRun === "inner"){
            inner_idx = outputArray[1];
            has_changed = outputArray[2];
            outputArray = [];
            await inner_loop();
        }
    }
}