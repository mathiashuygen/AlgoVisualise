
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







const algorithmPicker = document.querySelector(".algorithmPicker");
const stringInputField = document.querySelector(".stringField");
const stringInputFieldPattern = document.querySelector(".stringFieldPattern");
const submitField = document.querySelector(".stringSubmit");



function handleTextInput(){

    //pop up dialogue window, looks bad but cool nonetheless
    //const name = prompt("What is your name?");

    const userString = (stringInputField.value);
    const userPattern = (stringInputFieldPattern.value);
    const para = document.createElement("p");
    para.textContent = bruteForce(userString, userPattern);
    document.body.appendChild(para);
    stringInputField.focus();
}

submitField.addEventListener("click", handleTextInput);




const canvas = document.querySelector(".AlgorithmVisualiser");
const canvas_width = canvas.width;
const canvas_height = canvas.height;
const context = canvas.getContext("2d");



context.fillStyle = "rgb(10 10 344)";
context.fillRect(10, 10, 10, 10);


context.strokeStyle = "rgb(10 10 344)";
context.strokeRect(30, 10, 10, 10);
context.linewidth = 5;