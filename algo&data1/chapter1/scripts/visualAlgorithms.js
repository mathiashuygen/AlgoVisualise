
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









function drawStringAndPatternRetcs(inputString, pattern, stringX, stringY, patternX, patternY, indexInString, indexInPattern, rectDim, rectColor, textColor){
    drawRectWithInputString(inputString, stringX, stringY, rectDim, rectDim, indexInString, rectColor, textColor, drawFillRect);
    drawRectWithPattern(pattern, patternX, patternY, rectDim, rectDim, indexInPattern, rectColor, textColor, drawFillRect);
}



function resetStringAndPattern(inputString, pattern, patternX, rectDim){
    resetInputRectangle(inputString, rectDim);
    resetPatternRectangle(pattern, patternX, rectDim);
    drawInputString(inputString, rectDim, rectDim);
}










//beginning of the pattern matching algorithms from the course.



//brute force
export function VisualbruteForce(inputString, pattern, rectangleDimension){
    functionRunning = true;
    const n_t = inputString.length;
    const n_p = pattern.length;

    async function inner_iter(i_t, i_p){
        
        
        drawStringAndPatternRetcs(inputString, pattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "grey", "black");
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
            drawStringAndPatternRetcs(inputString, pattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "green", "black");
            await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);

            return inner_iter(i_t, (i_p + 1));
        }
        else{
            //show that the pattern doesn't match for the moment. 
            
            
            drawStringAndPatternRetcs(inputString, pattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "red", "black");
            await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);

            //reset the colors and move the pattern one to the right. 
            resetStringAndPattern(inputString, pattern, i_t, rectangleDimension);
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
        drawStringAndPatternRetcs(inputString, userPattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "grey", "black");
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
            drawStringAndPatternRetcs(inputString, userPattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "green", "black");
            await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);
            
            return inner_iter(i_t, (i_p + 1));
        }
        else{
            drawStringAndPatternRetcs(inputString, userPattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "red", "black");
            await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);
            


            let c_t = inputString[(i_t + n_p) % n_t];
            let shiftAmount = shift(c_t);
            i_t = i_t + shiftAmount

            if(!(shiftAmount > n_p)){
                drawStringAndPatternRetcs(inputString, userPattern, ((i_t - shiftAmount) + n_p) % n_t, 0,  (i_t - shiftAmount) + (n_p - 1) - (shiftAmount - 1), rectangleDimension,  ((i_t - shiftAmount) + n_p), (n_p - 1) - (shiftAmount - 1), rectangleDimension, "purple", "black");
                await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);
            }
            else{
                drawRectWithInputString(inputString, ((i_t - shiftAmount) + n_p) % n_t, 0, rectangleDimension, rectangleDimension, ((i_t - shiftAmount) + n_p), "orange", "black", drawFillRect);
                await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);
            }
            

            //reset the colors and move the pattern one to the right. 
            resetStringAndPattern(inputString, userPattern, i_t, rectangleDimension);
            movePattern(i_t - shiftAmount, i_t, rectangleDimension, userPattern, n_p);

            return inner_iter(i_t, 0);
        }
    }

    return (inner_iter(0, 0));
}
