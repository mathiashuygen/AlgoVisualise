
import { drawRectWithInputString, drawRectWithPattern, drawFillRect, drawInputString, resetInputRectangle, resetPatternRectangle, movePattern } from "./drawLogic.js";
import { slider, changeSliderValue, pauseButton } from "./buttons.js";






//the default wait time is 1000ms = 1s. 
const defaultFunctionExecutionSpeed = 1000;
var functionExecutionSpeedFactor = slider.value;


//variable used to pause the execution of a function. 
var paused = false;


//I do not allow resets while an algorithm is running. This is because I do not know yet how to stop a function from running in the middle of it's execution.
//To only allow resets while no algorithm is running I use this variable to show when some algorithm is running in the background. 
export var functionRunning = false;






//promise that allows me to sleep for a certain amount of ms in async functions. 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}







//function that gets called whenever a user uses the slider. This changes the execution speed of an algorithm. I do this by dividing the default wait time by the value of the slider. The bigger the value the
//faster the algorithm runs. 
function UpdateExecutionSpeed() {
    const sliderValue = slider.value;
    changeSliderValue(`x${sliderValue}`);
    functionExecutionSpeedFactor = slider.value;
}

//event listener to listen to the user manipulating the slider. 
slider.addEventListener("input", UpdateExecutionSpeed)





/*
function updatePauseButton(){
   
    if(paused){
        paused = false;
        pauseButton.textContent = "resume";
    

    }
    else{
        paused = true;
        pauseButton.textContent = "pause";
    }
}

pauseButton.addEventListener("click", updatePauseButton);
*/





//I created this function to replace two liners by a one liners. It's just to clean up the code. This functions draws rectangle for the input string and pattern at given indeces.
//the color of this rectangle can be whatever I want and it is used to show the user where in the pattern and string the algorithm is. It is also used to depict if two characters
//match. If they match I draw a green rectangle, if they don't I draw a red one. This can be seen in the three algorithms below. 
function drawStringAndPatternRetcs(inputString, pattern, stringX, stringY, patternX, patternY, indexInString, indexInPattern, rectDim, rectColor, textColor) {
    drawRectWithInputString(inputString, stringX, stringY, rectDim, rectDim, indexInString, rectColor, textColor, drawFillRect);
    drawRectWithPattern(pattern, patternX, patternY, rectDim, rectDim, indexInPattern, rectColor, textColor, drawFillRect);
}


//same reason for existing as above. This resets the canvas and redraws everyting such that the colors and previous pattern aren't visible anymore. The pattern moves to the right after most iterations. 
//Because of this I have to delete the pattern at each iteration and redraw it at a new location. I also do not want colours from previous iterations to still be on the screen, so I use this function
//to delete everything that I don't want on the screen anymore. After it is done it redraws the input string. The pattern is moved by another function. 
function resetStringAndPattern(inputString, pattern, patternX, rectDim) {
    resetInputRectangle(inputString, rectDim);
    resetPatternRectangle(pattern, patternX, rectDim);
    drawInputString(inputString, rectDim, rectDim);
}










export function VisualbruteForce(inputString, pattern, rectangleDimension) {

    functionRunning = true;
    const n_t = inputString.length;
    const n_p = pattern.length;

    var previous_i_t = 0;
    var previous_i_p = 0;
    var iterReturnArray;

    while(true){
        if (!paused) {
            iterReturnArray = inner_iter(inputString, pattern, previous_i_t, previous_i_p, n_t, n_p, rectangleDimension);
            if(!(iterReturnArray.length < 2)){
                previous_i_t = iterReturnArray[0];
                previous_i_p = iterReturnArray[1];
            }
            //algorithm is done so return from the function.
            else{
                return 0;
            }      
        }
    }
}



//beginning of the pattern matching algorithms from the course.



//brute force


async function inner_iter(inputString, pattern, i_t, i_p, n_t, n_p, rectangleDimension) {

    var outputArray = [];
    //pattern matches somewhere in the string. Return the index of the first character matching. 
    if (i_p > (n_p - 1)) {
        functionRunning = false;
        outputArray.concat(i_t);
        return outputArray;
    }

    //The pattern is not present in the string. Return false. 
    else if (i_t > (n_t - n_p)) {
        functionRunning = false;
        outputArray.concat(false);
        return outputArray;
    }

    //the characters of where we are in the string and where we are in the pattern match. Draw green rectangles to visualise this and go to the next pair of characters.  
    else if (inputString[(i_t + i_p)] === pattern[i_p]) {

        //lil comment. I use grey squares to indicate which two symbols are being compares. 
        drawStringAndPatternRetcs(inputString, pattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "grey", "black");
        await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);

        drawStringAndPatternRetcs(inputString, pattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "green", "black");
        await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);

        outputArray.concat(i_t);
        outputArray.concat(i_p + 1);
        return outputArray;
    }

    //The two characters do not match. Draw red rectangles to visualise this, move the pattern and move on to the next pair of characters. 
    else {

        drawStringAndPatternRetcs(inputString, pattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "grey", "black");
        await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);

        drawStringAndPatternRetcs(inputString, pattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "red", "black");
        await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);

        //reset the colors and move the pattern one to the right. 
        resetStringAndPattern(inputString, pattern, i_t, rectangleDimension);
        i_t = i_t + 1;
        movePattern(i_t - 1, i_t, rectangleDimension, pattern, pattern.length);

        outputArray.concat(i_t);
        outputArray.concat(0);
        return outputArray;
    }
}













//QuickSearch


//Quicksearch has two parts. First it needs a function that returns a lambda that can be used in the match function. The second part is the match function itself.


//shift table. Gives back a lambda that returns the amount of positions the pattern can move to the right. 
function computeShiftTable(pattern) {
    var n_p = pattern.length;
    var min_ascii = pattern.charCodeAt(0);
    var max_ascii = min_ascii;

    function createTable(index) {
        if (index < n_p) {
            min_ascii = Math.min(min_ascii, pattern.charCodeAt(index));
            max_ascii = Math.max(max_ascii, pattern.charCodeAt(index));
            return createTable(index + 1);
        }
        else {
            var table = [];
            for (let i = 0; i < ((max_ascii - min_ascii) + 1); i++) {
                table[i] = n_p + 1;
            }
            return table;
        }
    }

    var shiftTable = createTable(0);



    function fillTable(index) {
        if (index < n_p) {
            let ascii = pattern.charCodeAt(index);
            shiftTable[ascii - min_ascii] = n_p - index;
            return fillTable(index + 1);
        }
    }

    fillTable(0);


    return (char) => {
        let ascii = char.charCodeAt(0);
        if (max_ascii >= ascii && ascii >= min_ascii) {
            return shiftTable[ascii - min_ascii];
        }
        else {
            return n_p + 1;
        }
    }
}





//match fucntion
export function VisualQucikSearch(inputString, userPattern, rectangleDimension) {
    functionRunning = true;
    const n_t = inputString.length;
    const n_p = userPattern.length;
    let shift = computeShiftTable(userPattern);

    async function inner_iter(i_t, i_p) {

        //pattern matches somewhere in the string. Return the index of the first character matching. 
        if (i_p > (n_p - 1)) {
            functionRunning = false;
            return i_t;
        }

        //The pattern is not present in the string. Return false. 
        else if (i_t > (n_t - n_p)) {
            functionRunning = false;
            return false;
        }

        //the characters of where we are in the string and where we are in the pattern match. Draw green rectangles to visualise this and go to the next pair of characters. 
        else if (inputString[i_t + i_p] === userPattern[i_p]) {
            drawStringAndPatternRetcs(inputString, userPattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "grey", "black");
            await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);

            drawStringAndPatternRetcs(inputString, userPattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "green", "black");
            await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);

            return inner_iter(i_t, (i_p + 1));
        }

        //the characters of where we are in the string and where we are in the pattern don't match. Draw red rectangles to visualise this, compute how many positions the pattern can shift to the right, 
        //move the pattern and go into the next iteration.  
        else {
            drawStringAndPatternRetcs(inputString, userPattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "grey", "black");
            await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);

            drawStringAndPatternRetcs(inputString, userPattern, (i_t + i_p), 0, (i_t + i_p), rectangleDimension, (i_t + i_p), i_p, rectangleDimension, "red", "black");
            await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);


            //calc shift amount
            let c_t = inputString[(i_t + n_p) % n_t];
            let shiftAmount = shift(c_t);
            i_t = i_t + shiftAmount


            //the shifting can be done in two ways:
            //  1: c_t matches with a character in the pattern => allign them.
            //  2: c_t doesn't macth with a character in the pattern => shift the pattern to one index higher than c_t;
            //based on this, I colour c_t with a different colour. If 1 holds, the rectangle becomes purple, if 2 hold, it becomes orange. 
            if (!(shiftAmount > n_p)) {
                drawStringAndPatternRetcs(inputString, userPattern, ((i_t - shiftAmount) + n_p) % n_t, 0, (i_t - shiftAmount) + (n_p - 1) - (shiftAmount - 1), rectangleDimension, ((i_t - shiftAmount) + n_p), (n_p - 1) - (shiftAmount - 1), rectangleDimension, "purple", "black");
                await sleep(defaultFunctionExecutionSpeed / functionExecutionSpeedFactor);
            }
            else {
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
