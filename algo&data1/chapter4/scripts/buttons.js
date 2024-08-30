export const algorithmPicker = document.querySelector(".algorithmPicker");
export const userInput = document.querySelector(".numberField");
export const addValueButton = document.querySelector(".addValue");
export const startAlgorithmButton = document.querySelector(".startAlgorithm")
export const resetButton = document.querySelector(".resetButton");
export const executionSlider = document.querySelector(".slider");
export const pauseButton = document.querySelector(".pauseButton");
const sliderValueVisual = document.querySelector(".valueVisual");

export function changeSliderValue(newVal){
    sliderValueVisual.textContent = newVal;
}
