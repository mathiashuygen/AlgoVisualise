import { selectorButton } from "./buttons.js";

selectorButton.addEventListener("click", handleSelector());

function handleSelector() {
  let implementation = selectorButton.value;
  console.log(implementation);
  if (implementation === "Vectorial") {
    addVectorLengthInputField();
  }
}

function addVectorLengthInputField() {
  const parent = document.getElementById("optional");
  
  var label = document.createElement("label");
  label.setAttribute("for", "vectorLength");
  label.setAttribute("value", "enter vector length");


  var input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("id", "vectorLength");
  input.setAttribute("value", "You Just added a text field ");
  input.setAttribute("style", "font-size: 120%;");
  input.setAttribute("style", "width: 100%;");
  parent.appendChild(label);
  parent.appendChild(input);
}
