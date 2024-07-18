

//init for canvas. Used to draw.
const canvas = document.querySelector(".AlgorithmVisualiser");
const context = canvas.getContext("2d");
width = window.innerWidth - 10;
height = window.innerHeight/1.5;
canvas.width = width;
canvas.height = height;



const algorithmPicker = document.querySelector(".algorithmPicker");
const stringInputField = document.querySelector(".stringField");
const stringInputFieldPattern = document.querySelector(".stringFieldPattern");
const submitField = document.querySelector(".stringSubmit");
const resetButton = document.querySelector(".resetButton");
const slider = document.querySelector(".slider");
const sliderVal = document.querySelector(".valueVisual");



let functionRunning = false;
let defaultFunctionExecutionSpeed = 1000;
let functionExecutionSpeedFactor = slider.value;



//
const max_amount_chars = 20;
const rectangle_min_dimensions = width/max_amount_chars; 





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}















//beginning of the pattern matching algorithms from the course.
//brute force
function VisualbruteForce(inputString, pattern, rectangleDimension){
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
            movePattern(i_t - 1, i_t, 1, rectangleDimension, pattern, pattern.length);
            
            return inner_iter(i_t, 0);
        }
    }
    
    return inner_iter(0, 0);
}


function drawFillRect(x, y, w, h){
    context.fillRect(x, y, w, h);
}

function drawStokeRect(x, y, w, h){
    context.strokeRect(x, y, w, h);
}





function drawRectWithInputString(string, x, y, rectDimension, textSize, stringIndex, rectColor, textColor, rectangleDrawFunc){
        //draws the rectangle
        context.fillStyle = rectColor;
        rectangleDrawFunc((rectDimension * x), y, rectDimension, rectDimension);

        //draws the char in a rectangle
        context.fillStyle = textColor;
        context.font = `${textSize}px arial`;
        context.fillText(string[stringIndex], (rectDimension * x) + (rectDimension/10), rectDimension - ((1/5) * rectDimension));   
}



function drawRectWithPattern(pattern, x, y, rectDimension, textSize, stringIndex, rectClor, textColor, rectangleDrawFunc){
        //draws the rectangle
        context.fillStyle = rectClor;
        rectangleDrawFunc((rectDimension * x), y, rectDimension, rectDimension);

        //draws the char in a rectangle
        context.fillStyle = textColor;
        context.font = `${textSize}px arial`;
        context.fillText(pattern[stringIndex], (rectDimension * x) + (rectDimension/10), 2*rectDimension - ((1/5) * rectDimension));
}






function drawInputString(string, rectangleDimension, textSize){
    for(let i = 0; i < string.length; i++){
        drawRectWithInputString(string, i, 0, rectangleDimension, textSize, i, "black", "black", drawStokeRect);
    }
}

function drawPattern(pattern, startingPoint, rectangleDimension, textSize){
    let indexInString = 0;
    for(let i = startingPoint; indexInString < pattern.length; i++){
        drawRectWithPattern(pattern, i, rectangleDimension, rectangleDimension, textSize, indexInString, "black", "black", drawStokeRect);
        indexInString += 1;
    }
}


function resetInputRectangle(string, rectangleDimension){
    for(let i = 0; i < string.length; i++){
        context.clearRect(rectangleDimension * i, 0, rectangleDimension, rectangleDimension);
    }
}

function resetPatternRectangle(pattern, startingPoint, rectangleDimension){
    let indexInString = 0;
    for(let i = startingPoint; indexInString < pattern.length; i++){
        context.clearRect(rectangleDimension * i, rectangleDimension, rectangleDimension, rectangleDimension);
        indexInString += 1;

    }
}



function movePattern(previousStartingPoint, newStartingPoint, moveAmount, rectangleDimension, pattern, patternLength){
    resetPatternRectangle(pattern, previousStartingPoint, rectangleDimension);
    drawPattern(pattern, newStartingPoint, rectangleDimension, rectangleDimension);
    
}








function handleTextInput(){ 

    //pop up dialogue window, looks bad but cool nonetheless
    //const name = prompt("What is your name?");
    const userString = stringInputField.value.toLowerCase();
    const userPattern = stringInputFieldPattern.value.toLowerCase();
    const dim = width/Math.max(userString.length, userPattern.length);
    const rectangle_dimensions = dim < height/2 ? dim : dim/2;
    const textSize = rectangle_dimensions;

    /*
    const para = document.createElement("p");
    para.textContent = bruteForce(userString, userPattern);
    document.body.appendChild(para);
    */

    drawInputString(userString, rectangle_dimensions, rectangle_dimensions);
    drawPattern(userPattern, 0, rectangle_dimensions, rectangle_dimensions);
    VisualbruteForce(userString, userPattern, rectangle_dimensions);
    
    
    stringInputField.focus();
}



function resetCanvas(){
    if(!functionRunning){
    context.clearRect(0, 0, width, height);
    window.stop();
    }
}


function outputSliderValue(){
    const sliderValue = slider.value;
    sliderVal.textContent = `x${sliderValue}`;
    functionExecutionSpeedFactor = slider.value;
}



submitField.addEventListener("click", handleTextInput);

resetButton.addEventListener("click", resetCanvas)

slider.addEventListener("input", outputSliderValue)


window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight/1.5;
    handleTextInput();
});






