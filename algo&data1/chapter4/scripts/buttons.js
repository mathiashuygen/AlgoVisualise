export const algorithmPicker = document.querySelector(".algorithmPicker");
export const userInput = document.querySelector(".numberField");
export const addValueButton = document.querySelector(".addValue");
export const startAlgorithmButton = document.querySelector(".startAlgorithm")
export const resetButton = document.querySelector(".resetButton");
export const executionSlider = document.querySelector(".slider");
export const backButton = document.querySelector(".backButton");
export const pauseButton = document.querySelector(".pauseButton");

export function changeSliderValue(newVal){
    executionSlider.textContent = newVal;
}