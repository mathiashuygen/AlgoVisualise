
import { drawRectWithInputString, drawRectWithPattern, drawFillRect, drawInputString, resetInputRectangle, resetPatternRectangle, movePattern} from "./drawLogic.js";
import { slider, sliderVal, changeSliderValue } from "./buttons.js";







const defaultFunctionExecutionSpeed = 1000;
var functionExecutionSpeedFactor = slider.value;

export var functionRunning = false;



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function outputSliderValue(){
    const sliderValue = slider.value;
    sliderVal.textContent = `x${sliderValue}`;
    functionExecutionSpeedFactor = slider.value;
}

slider.addEventListener("input", outputSliderValue)














//beginning of the pattern matching algorithms from the course.



//brute force
export function VisualbruteForce(inputString, pattern, rectangleDimension){
    functionRunning = true;
    const n_t = inputString.length;
    const n_p = pattern.length;

    async function inner_iter(i_t, i_p){
        
        drawRectWithInputString(inputString, (i_t + i_p), 0, rectangleDimension, rectangleDimension, (i_t + i_p), "grey", "black", drawFillRect);
        drawRectWithPattern(pattern, (i_t + i_p), rectangleDimension, rectangleDimension, rectangleDimension, i_p, "grey", "black", drawFillRect);
        await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor); 


        if(i_p > (n_p - 1)){
            functionRunning = false;
            return i_t;
        }
        else if(i_t > (n_t - n_p)){
            functionRunning = false; 
            return false;   
        }
        else if(inputString[(i_t + i_p)] === pattern[i_p]){
            drawRectWithInputString(inputString, (i_t + i_p), 0, rectangleDimension, rectangleDimension, (i_t + i_p), "green", "black", drawFillRect);
            drawRectWithPattern(pattern, (i_t + i_p), rectangleDimension, rectangleDimension, rectangleDimension, i_p, "green", "black", drawFillRect);
            await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);
            return inner_iter(i_t, (i_p + 1));
        }
        else{
            //show that the pattern doesn't match for the moment. 
            drawRectWithInputString(inputString, (i_t + i_p), 0, rectangleDimension, rectangleDimension, (i_t + i_p), "red", "black", drawFillRect);
            drawRectWithPattern(pattern, (i_t + i_p), rectangleDimension, rectangleDimension, rectangleDimension, i_p, "red", "black", drawFillRect);
            await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);

            //reset the colors and move the pattern one to the right. 
            resetInputRectangle(inputString, rectangleDimension);
            resetPatternRectangle(pattern, i_t, rectangleDimension);
            drawInputString(inputString, rectangleDimension, rectangleDimension);
            i_t = i_t + 1;
            movePattern(i_t - 1, i_t, rectangleDimension, pattern, pattern.length);
            
            inner_iter(i_t, 0);
        }
    }
    
    return inner_iter(0, 0);
}













//QuickSearch
//Quicksearch has two parts. First it needs a function that returns a lambda that can be used in the match function. The second part is the match function itself.


//shift table

function computeShiftTable(pattern){
    var n_p = pattern.length;
    var min_ascii = pattern.charCodeAt(0);
    var max_ascii = min_ascii;

    function createTable(index){
        if(index < n_p){
            min_ascii = Math.min(min_ascii, pattern.charCodeAt(index));
            max_ascii = Math.max(max_ascii, pattern.charCodeAt(index));
            return createTable(index + 1);
        }
        else{
            var table = [];
            for(let i = 0; i < ((max_ascii - min_ascii) + 1); i++){
                table[i] = n_p + 1;
            }
            return table;
        }
    }

    var shiftTable = createTable(0);



    function fillTable(index){
        if(index < n_p){
            let ascii = pattern.charCodeAt(index);
            shiftTable[ascii - min_ascii] = n_p - index;
            return fillTable(index + 1);
        }
    }

    fillTable(0);


    return (char) => {
        let ascii = char.charCodeAt(0);
        if(max_ascii >= ascii && ascii >= min_ascii){
            return shiftTable[ascii - min_ascii];
        }
        else{
            return n_p + 1;
        }
    }
}




export function VisualQucikSearch(inputString, userPattern, rectangleDimension){
    functionRunning = true;
    const n_t = inputString.length;
    const n_p = userPattern.length;
    let shift = computeShiftTable(userPattern);

    async function inner_iter(i_t, i_p){
        drawRectWithInputString(inputString, (i_t + i_p), 0, rectangleDimension, rectangleDimension, (i_t + i_p), "grey", "black", drawFillRect);
        drawRectWithPattern(userPattern, (i_t + i_p), rectangleDimension, rectangleDimension, rectangleDimension, i_p, "grey", "black", drawFillRect);
        await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);

        if(i_p > (n_p - 1)){
            functionRunning = false;
            return i_t;
        }
        else if(i_t > (n_t - n_p)){
            functionRunning = false;
            return false;
        }
        else if(inputString[i_t + i_p] === userPattern[i_p]){
            drawRectWithInputString(inputString, (i_t + i_p), 0, rectangleDimension, rectangleDimension, (i_t + i_p), "green", "black", drawFillRect);
            drawRectWithPattern(userPattern, (i_t + i_p), rectangleDimension, rectangleDimension, rectangleDimension, i_p, "green", "black", drawFillRect);
            await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);
            
            return inner_iter(i_t, (i_p + 1));
        }
        else{
            drawRectWithInputString(inputString, (i_t + i_p), 0, rectangleDimension, rectangleDimension, (i_t + i_p), "red", "black", drawFillRect);
            drawRectWithPattern(userPattern, (i_t + i_p), rectangleDimension, rectangleDimension, rectangleDimension, i_p, "red", "black", drawFillRect);
            await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);
            


            let c_t = inputString[(i_t + n_p) % n_t];
            let shiftAmount = shift(c_t);
            i_t = i_t + shiftAmount

            if(!(shiftAmount > n_p)){
                drawRectWithInputString(inputString, ((i_t - shiftAmount) + n_p) % n_t, 0, rectangleDimension, rectangleDimension, ((i_t - shiftAmount) + n_p), "purple", "black", drawFillRect);
                drawRectWithPattern(userPattern, (i_t - shiftAmount) + (n_p - 1) - (shiftAmount - 1), rectangleDimension, rectangleDimension, rectangleDimension, (n_p - 1) - (shiftAmount - 1), "purple", "black", drawFillRect);
            }
            else{
                drawRectWithInputString(inputString, ((i_t - shiftAmount) + n_p) % n_t, 0, rectangleDimension, rectangleDimension, ((i_t - shiftAmount) + n_p), "orange", "black", drawFillRect);
            }
            await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);

            //reset the colors and move the pattern one to the right. 
            resetInputRectangle(inputString, rectangleDimension);
            resetPatternRectangle(userPattern, i_t, rectangleDimension);
            drawInputString(inputString, rectangleDimension, rectangleDimension);
            movePattern(i_t - shiftAmount, i_t, rectangleDimension, userPattern, n_p);

            return inner_iter(i_t, 0);
        }
    }

    return (inner_iter(0, 0));
}
