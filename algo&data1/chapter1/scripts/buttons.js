

/*
collection of all the buttons and fields present on this page. T
*/
export const algorithmPicker = document.querySelector(".algorithmPicker");
export const stringInputField = document.querySelector(".stringField");
export const stringInputFieldPattern = document.querySelector(".stringFieldPattern");
export const submitField = document.querySelector(".stringSubmit");
export const resetButton = document.querySelector(".resetButton");
export const slider = document.querySelector(".slider");
export const sliderVal = document.querySelector(".valueVisual");
export const pauseButton = document.querySelector(".pauseButton");

export function changeSliderValue(newVal){
    sliderVal.textContent = newVal;
}