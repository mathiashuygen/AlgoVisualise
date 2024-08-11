
import { resetButton, executionSlider, backButton, pauseButton, changeSliderValue } from "./buttons.js";
import { drawRect } from "./drawLogic.js";



var functionExecutionSpeedFactor = 1000;



function UpdateExecutionSpeed() {
    let sliderValue = executionSlider.value;
    changeSliderValue(`x${sliderValue}`);
    console.log(sliderValue);
    functionExecutionSpeedFactor = sliderValue;
}

executionSlider.addEventListener("input", UpdateExecutionSpeed);





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}






var outputArray = [];



export async function VisualBubbleSort(arrayToSort){

    var unsorted_idx = arrayToSort.length - 2;
    var inner_idx = 0;
    has_changed = false;

    async function bubble_swap(sortingArray, idx1, idx2){
        let keep = sortingArray[idx1];
        sortingArray[idx1] = sortingArray[idx2];
        sortingArray[idx2] = keep;
        
        return true;
    }

    async function outer_loop(){
        if(unsorted_idx >= 0){
            if(inner_loop()){
                outputArray.push("outer");
                outputArray.push(unsorted_idx - 1);
            }
        }   
    }

    async function inner_loop(){
        if(inner_idx > unsorted_idx){
            return has_changed;
        }
        else{
            outputArray.push("inner");
            outputArray.push(inner_idx + 1);
            if(sortingArray[inner_idx] < sortingArray[inner_idx + 1]){
                outputArray.push(bubble_swap(inner_idx, inner_idx + 1));
            }
            else{
                outputArray.push(has_changed);
            }
        }
    }





    while(true){

    }
}