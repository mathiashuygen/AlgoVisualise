import {
  valueField,
  positionField,
  selectorButton,
  newButton,
  addBeforeButton,
  addAfterButton,
  lengthButton,
  firstButton,
  lastButton,
  hasNextButton,
  hasPreviousButton,
  nextButton,
  previousButton,
  peekButton,
  updateButton,
  deleteButton,
  resetButton,
} from "./buttons.js";
import { vector } from "./implementations/vectorial/vectorMain.js";

import { add_before, add_after, deleteElement } from "./implementations/generalProcedures.js";

var previousSelection = "vector";
var currentImplementation;

function handleSelector() {
  let implementation = selectorButton.value;

  if (implementation === "Vectorial") {
    addVectorLengthInputField();
    previousSelection = "vector";
  } else {
    if (previousSelection === "vector") {
      removeVectorLengthInputField();
    }
    if (implementation === "SingleLinked") {
      previousSelection = "single";
    } else if (implementation === "DoubleLinked") {
      previousSelection = "double";
    } else if (implementation === "ImprovedDoubleLinked") {
      previousSelection = "augmemtedDouble";
    } else {
      return 0;
    }
  }
  return 0;
}

function addVectorLengthInputField() {
  const parent = document.getElementById("optional");

  var input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("id", "vectorLength");
  input.setAttribute("style", "font-size: 120%;");
  input.setAttribute("style", "width: 100%;");
  parent.appendChild(input);
  return 0;
}

function removeVectorLengthInputField() {
  const inputField = document.getElementById("vectorLength");
  inputField.remove();
  return 0;
}

function handleNew() {
  let plistImplementation = previousSelection;

  if (plistImplementation === "vector") {
    let vectorLengthButton = document.getElementById("vectorLength");
    currentImplementation = new vector(vectorLengthButton.value);
  }

  else {
    console.log("others not yet implemented");
  }
}

handleSelector();
selectorButton.addEventListener("change", handleSelector);

newButton.addEventListener("click", handleNew);

addBeforeButton.addEventListener("click", ()=>{
  let valueToAdd = valueField.value;
  let position = positionField.value;
  
  let positionArray = [];
  if(!(position === "")){
    positionArray.push(position);
  }

  
  add_before(currentImplementation, valueToAdd, positionArray);
})

addAfterButton.addEventListener("click", ()=>{
  let valueToAdd = valueField.value;
  let position = positionField.value
  
  let positionArray = [];
  if(!(position === "")){
    positionArray.push(position);
  }
  add_after(currentImplementation, positionArray, valueToAdd);
})

lengthButton.addEventListener("click", ()=>{
 console.log(currentImplementation.length);
})

firstButton.addEventListener("click", ()=> {
  currentImplementation.first;
})

lastButton.addEventListener("click", ()=>{
  currentImplementation.last;
})

hasNextButton.addEventListener("click", ()=>{
  let positon = positionField.value;
  currentImplementation.has_next(positon);
})

hasPreviousButton.addEventListener("click", ()=>{
  let position = positionField.value;
  currentImplementation.has_previous(position);
})

nextButton.addEventListener("click", ()=>{
  let position = positionField.value;
  currentImplementation.next(position);
})

previousButton.addEventListener("click", ()=>{
  let position = positionField.value;
  currentImplementation.previous(position);
})

peekButton.addEventListener("click", ()=>{
  let position = positionField.value;
  currentImplementation.peek(position);
})

updateButton.addEventListener("click", ()=>{
  let position = positionField.value;
  let newValue = valueField.value;
  currentImplementation.update(position, newValue);
})

deleteButton.addEventListener("click", ()=>{
  let position = positionField.value;
  deleteElement(currentImplementation, position);
})
