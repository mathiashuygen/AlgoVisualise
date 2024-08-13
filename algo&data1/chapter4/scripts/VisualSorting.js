
import { resetButton, executionSlider, pauseButton, changeSliderValue } from "./buttons.js";
import { drawFillRect, drawRect, drawIndexText, clearIndexText, width, height, context, rectYPos, overlappingTextYPos } from "./drawLogic.js";


//default of 1s sleep.
const defaultFunctionExecutionSpeed = 1000;
var executionSpeedFactor = executionSlider.value;



function UpdateExecutionSpeed() {
    let sliderValue = executionSlider.value;
    changeSliderValue(`x${sliderValue}`);
    console.log(sliderValue);
    executionSpeedFactor = sliderValue;
}

executionSlider.addEventListener("input", UpdateExecutionSpeed);







var reset = false; 


//resets the canvas. 
function resetCanvas(){
    reset = true; 
}


resetButton.addEventListener("click", resetCanvas)






var paused = false;




function updatePauseButton() {

    if (paused) {
        paused = false;
        pauseButton.textContent = "||";


    }
    else {
        paused = true;
        pauseButton.textContent = "▷";
    }
}

pauseButton.addEventListener("click", updatePauseButton);








function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}






var outputArray = [];



function stepVisualiser(idx1, idx2, rectColor, textColor, drawRectFunc, array){
    drawRect(idx1, array[idx1], rectColor, textColor, drawRectFunc);
    drawRect(idx2, array[idx2], rectColor, textColor, drawRectFunc);
}



function colorArray(array, color){
    for(let i = 0; i < array.length; i++){
        drawRect(i, array[i], color, "black", drawFillRect);
    }
}



function displayArray(array){
    for(let i = 0; i < array.length; i++){
        console.log(array[i]);
    }
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


        

        if(inner_idx !== unsorted_idx){
            drawIndexText(inner_idx, rectYPos, "inner idx", "green");
            drawIndexText(unsorted_idx, rectYPos, "unsorted idx", "purple");
        }
        else{
            drawIndexText(inner_idx, overlappingTextYPos, "inner idx", "green");
            drawIndexText(unsorted_idx, rectYPos, "unsorted idx", "purple");
        }
        if(inner_idx > unsorted_idx){
            drawRect(inner_idx, arrayToSort[inner_idx], "green", "black", drawFillRect);
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

        clearIndexText(inner_idx);
        clearIndexText(unsorted_idx);

        if(reset){
            context.clearRect(0, 0, width, height);
            reset = false;
            outputArray = [];
            outputArray.push("begin");
            return 0;
        }

        else if(!paused){
            let loopToRun = outputArray[0];

            if(loopToRun === "begin"){
                if(unsorted_idx >= 0){
                    outputArray = [];
                    outputArray.push("inner");
                    outputArray.push(0);
                    outputArray.push(false);
                }
                else{
                    paused = true;
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
                        paused = true;
                        colorArray(arrayToSort, "green");
                    }
                }
                else{
                    paused = true;
                    colorArray(arrayToSort, "green");
                }
            }
            else if(loopToRun === "inner"){
                inner_idx = outputArray[1];
                has_changed = outputArray[2];
                outputArray = [];
                await inner_loop();
            }
        }
        else{
            await sleep(200);
        }
    }
}








export async function VisualInsertionSort(arrayToSort){

    var outer_idx = arrayToSort.length - 2;
    var inner_idx = outer_idx + 1;

    var outputArray = [];


    async function swap(idx1, idx2){
        
        let keep = arrayToSort[idx1];
        arrayToSort[idx1] = arrayToSort[idx2];
        arrayToSort[idx2] = keep;

        stepVisualiser(inner_idx, outer_idx, "grey", "black", drawFillRect, arrayToSort);
        await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
        stepVisualiser(idx1, idx2, "red", "black", drawFillRect, arrayToSort);
        await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
        return 0;
    }

    async function inner_loop(){

        
        if(!(inner_idx >= arrayToSort.length)){
            stepVisualiser(inner_idx, outer_idx, "grey", "black", drawFillRect, arrayToSort);
            await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
        }

        if(inner_idx >= arrayToSort.length){
            outputArray.push("outer");
            outputArray.push(outer_idx - 1);
            outputArray.push(outer_idx);
            return 0;
        }
        else if(arrayToSort[inner_idx] > arrayToSort[outer_idx]){
            drawRect(inner_idx, arrayToSort[inner_idx], "green", "black", drawFillRect);
            outputArray.push("outer");
            outputArray.push(outer_idx - 1);
            outputArray.push(outer_idx);
            return 0;
        }
        else{
            
            
            stepVisualiser(inner_idx, outer_idx, "purple", "black", drawFillRect, arrayToSort);
            await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
            
            swap(outer_idx, inner_idx);
            outputArray.push("inner");
            outputArray.push(inner_idx);
            outputArray.push(inner_idx + 1);
            return 0;
        }

    }


    outputArray.push("begin");

    while(true){

        if(reset){
            context.clearRect(0, 0, width, height);
            reset = false;
            outputArray = [];
            outputArray.push("begin");
            return 0;
        }

        else if(!paused){
            let loopToRun = outputArray[0];

            if(loopToRun === "begin"){
                outputArray = [];
                outputArray.push("inner");
                outputArray.push(outer_idx);
                outputArray.push(inner_idx);
            }
            
            else if(loopToRun === "outer"){
                outer_idx = outputArray[1];
                inner_idx = outputArray[2];
                
                if(outer_idx < 0){
                    colorArray(arrayToSort, "green");
                    return 0;
                }
                else{
                    outputArray = [];
                    outputArray.push("inner");
                    outputArray.push(outer_idx);
                    outputArray.push(inner_idx);
                }
            }
            else if(loopToRun === "inner"){
                outer_idx = outputArray[1];
                inner_idx = outputArray[2];
                outputArray = [];
                await inner_loop();
            }
        }
        else{
            await sleep(200);
        }
    }
}







export async function VisualSelectionSort(arrayToSort){


    var outer_idx = 0;
    var inner_idx = outer_idx + 1;
    var smallest_idx = outer_idx;

    var outputArray = [];



    async function swap(idx1, idx2){
        
        let keep = arrayToSort[idx1];
        arrayToSort[idx1] = arrayToSort[idx2];
        arrayToSort[idx2] = keep;
        /*
        stepVisualiser(inner_idx, outer_idx, "grey", "black", drawFillRect, arrayToSort);
        await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
        stepVisualiser(idx1, idx2, "red", "black", drawFillRect, arrayToSort);
        await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
        */
        return 0;
    }



    async function inner_loop(){
        if(inner_idx >= arrayToSort.length){
            await swap(outer_idx, smallest_idx);
            outputArray.push("outer");
            outputArray.push(outer_idx);
        }
        else if(outputArray[inner_idx] < outputArray[smallest_idx]){
            outputArray.push("inner");
            outputArray.push(inner_idx + 1);
            outputArray.push(inner_idx);
        }
        else{
            outputArray.push("inner");
            outputArray.push(inner_idx + 1);
            outputArray.push(smallest_idx);
        }
    }


    outputArray.push("begin");

    while(true){
        var loopToRun = outputArray[0];

        if(loopToRun === "begin"){
            outputArray = [];
            outputArray.push("inner");
            outputArray.push(inner_idx);
            outputArray.push(smallest_idx);
        }
        else if(loopToRun === "outer"){
            outer_idx = outputArray[1];

            if(outer_idx < (arrayToSort.length - 1)){
                outer_idx = outer_idx + 1;
                inner_idx = outer_idx + 1;
                smallest_idx = outer_idx;

                outputArray = [];
                outputArray.push("inner");
                outputArray.push(inner_idx);
                outputArray.push(smallest_idx);
            }
            else{
                //algorithm is done
                displayArray(arrayToSort);
                return 0;
            }
        }
        else if(loopToRun === "inner"){
            inner_idx = outputArray[1];
            smallest_idx = outputArray[2];
            outputArray = [];
            await inner_loop();
        }

    }
}















