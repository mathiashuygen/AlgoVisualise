

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


window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight/1.5;
});



















//beginning of the pattern matching algorithms from the course.
//brute force
function bruteForce(inputString, pattern){
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
            return inner_iter(i_t, (i_p + 1));
        }
        else{
            return inner_iter((i_t + 1), 0);
        }
    }
    return inner_iter(0, 0);
}






function drawRectWithInputString(string, rectDimension, textSize){
    for(let i = 0; i < string.length; i++){
        //draws the rectangle
        context.fillStyle = "rgb(0 0 0)";
        context.strokeRect((rectDimension * i), 0, rectDimension, rectDimension);

        //draws the char in a rectangle
        context.font = `${textSize}px arial`;
        context.fillText(string[i], (rectDimension * i) + (rectDimension/10), rectDimension - ((1/5) * rectDimension));
    }
}


function drawRectWithPattern(pattern, rectDimension, textSize){
    for(let i = 0; i < pattern.length; i++){
        //draws the rectangle
        context.fillStyle = "rgb(0 0 0)";
        context.strokeRect((rectDimension * i), rectDimension, rectDimension, rectDimension);

        //draws the char in a rectangle
        context.font = `${textSize}px arial`;
        context.fillText(pattern[i], (rectDimension * i) + (rectDimension/10), 2*rectDimension - ((1/5) * rectDimension));
    }
}


function drawInput(string, pattern){
    const dim = width/Math.max(string.length, pattern.length);
    const rectangle_dimensions = dim < height/2 ? dim : dim/2;
    const textSize = rectangle_dimensions;
    
    drawRectWithInputString(string, rectangle_dimensions, textSize);
    drawRectWithPattern(pattern, rectangle_dimensions, textSize);

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
    /*
    const para = document.createElement("p");
    para.textContent = bruteForce(userString, userPattern);
    document.body.appendChild(para);
    */


    drawInput(userString, userPattern);
    stringInputField.focus();
}

submitField.addEventListener("click", handleTextInput);









