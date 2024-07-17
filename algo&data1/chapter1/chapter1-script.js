
const stringInputField = document.querySelector(".stringField");
const submitField = document.querySelector(".stringSubmit");

function handleTextInput(){
    const userString = String(stringInputField.value);
    const para = document.createElement("p");
    para.textContent = userString.length;
    document.body.appendChild(para);
    stringInputField.focus();
}


submitField.addEventListener("click", handleTextInput);