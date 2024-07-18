

//init for canvas. Used to draw.
const canvas = document.querySelector(".AlgorithmVisualiser");
const context = canvas.getContext("2d");
width = window.innerWidth - 10;
height = window.innerHeight/1.5;
canvas.width = width;
canvas.height = height;



//
const max_amount_chars = 20;
const rectangle_min_dimensions = width/max_amount_chars; 





function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


















//beginning of the pattern matching algorithms from the course.
//brute force
function VisualbruteForce(inputString, pattern, rectangleDimension){
    const n_t = inputString.length;
    const n_p = pattern.length;

    function inner_iter(i_t, i_p){
        if(i_p > (n_p - 1)){
            return i_t;
        }
        else if(i_t > (n_t - n_p)){
            return false;   
        }
        else if(inputString[(i_t + i_p)] === pattern[i_p]){
            drawFillRectWithInputString(inputString, rectangleDimension, rectangleDimension, (i_t + i_p), "green", "black");
            drawFillRectWithPattern(pattern, rectangleDimension, rectangleDimension, i_p, "green", "black");
            
            return inner_iter(i_t, (i_p + 1));
        }
        else{
            return inner_iter((i_t + 1), 0);
        }
    }
    return inner_iter(0, 0);
}






function drawStrokeRectWithInputString(string, rectDimension, textSize, stringIndex, rectColor, textColor){
        //draws the rectangle
        context.fillStyle = rectColor;
        context.strokeRect((rectDimension * stringIndex), 0, rectDimension, rectDimension);

        //draws the char in a rectangle
        context.fillStyle = textColor;
        context.font = `${textSize}px arial`;
        context.fillText(string[stringIndex], (rectDimension * stringIndex) + (rectDimension/10), rectDimension - ((1/5) * rectDimension));   
}



function drawFillRectWithInputString(string, rectDimension, textSize, stringIndex, rectColor, textColor){
    //draws the rectangle
    context.fillStyle = rectColor;
    context.fillRect((rectDimension * stringIndex), 0, rectDimension, rectDimension);

    //draws the char in a rectangle
    context.fillStyle = textColor;
    context.font = `${textSize}px arial`;
    context.fillText(string[stringIndex], (rectDimension * stringIndex) + (rectDimension/10), rectDimension - ((1/5) * rectDimension));   
}


function drawStrokeRectWithPattern(pattern, rectDimension, textSize, stringIndex, rectClor, textColor){
        //draws the rectangle
        context.fillStyle = rectClor;
        context.strokeRect((rectDimension * stringIndex), rectDimension, rectDimension, rectDimension);

        //draws the char in a rectangle
        context.fillStyle = textColor;
        context.font = `${textSize}px arial`;
        context.fillText(pattern[stringIndex], (rectDimension * stringIndex) + (rectDimension/10), 2*rectDimension - ((1/5) * rectDimension));
}




function drawFillRectWithPattern(pattern, rectDimension, textSize, stringIndex, rectColor, textColor){
    //draws the rectangle
    context.fillStyle = rectColor;
    context.fillRect((rectDimension * stringIndex), rectDimension, rectDimension, rectDimension);

    //draws the char in a rectangle
    context.fillStyle = textColor;
    context.font = `${textSize}px arial`;
    context.fillText(pattern[stringIndex], (rectDimension * stringIndex) + (rectDimension/10), 2*rectDimension - ((1/5) * rectDimension));
}


function drawInput(string, pattern, rectangleDimension, textSize){
    
    for(let i = 0; i < string.length; i++){
        drawStrokeRectWithInputString(string, rectangleDimension, textSize, i, "black", "black");
    }

    for(let i = 0; i < pattern.length; i++){
        drawStrokeRectWithPattern(pattern, rectangleDimension, textSize, i, "black", "black");
    }

}





const algorithmPicker = document.querySelector(".algorithmPicker");
const stringInputField = document.querySelector(".stringField");
const stringInputFieldPattern = document.querySelector(".stringFieldPattern");
const submitField = document.querySelector(".stringSubmit");



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

    drawInput(userString, userPattern, rectangle_dimensions, textSize);
    console.log("ik kom hier");
    VisualbruteForce(userString, userPattern, rectangle_dimensions);
    
    
    stringInputField.focus();
}



submitField.addEventListener("click", handleTextInput);


window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight/1.5;
    handleTextInput();
});






