

//init for canvas. Used to draw.
import { canvas, context, width, height, drawInputString, drawPattern} from "./drawLogic.js";
import { VisualbruteForce, VisualQucikSearch, functionRunning} from "./visualAlgorithms.js";
import { algorithmPicker, stringInputField, stringInputFieldPattern, submitField, resetButton} from "./buttons.js";





function handleTextInput(){ 

    //pop up dialogue window, looks bad but cool nonetheless
    //const name = prompt("What is your name?");
    const userString = stringInputField.value.toLowerCase();
    const userPattern = stringInputFieldPattern.value.toLowerCase();
    const dim = width/Math.max(userString.length, userPattern.length);
    const rectangle_dimensions = dim < height/2 ? dim : dim/2;

    /*
    const para = document.createElement("p");
    para.textContent = bruteForce(userString, userPattern);
    document.body.appendChild(para);
    */

    drawInputString(userString, rectangle_dimensions, rectangle_dimensions);
    drawPattern(userPattern, 0, rectangle_dimensions, rectangle_dimensions);

    
    if(algorithmPicker.value === "BruteForce"){
        VisualbruteForce(userString, userPattern, rectangle_dimensions);
    }
    else if(algorithmPicker.value === "QuickSearch"){
        VisualQucikSearch(userString, userPattern, rectangle_dimensions);
    }
    
    
    stringInputField.focus();
}



function resetCanvas(){
    if(!functionRunning){
    context.clearRect(0, 0, width, height);
    }
}






submitField.addEventListener("click", handleTextInput);

resetButton.addEventListener("click", resetCanvas)




window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight/1.5;
    handleTextInput();
});






