export const canvas = document.querySelector(".AlgorithmVisualiser");
export const context = canvas.getContext("2d");
export const width = window.innerWidth - 10;
export const height = window.innerHeight/1.5;
canvas.width = width;
canvas.height = height;
const rectDimension = height/5;

export const rectYPos = height/2 - rectDimension
export const overlappingTextYPos = rectYPos + rectDimension/3;
export const xPosOffset = 2;
export const maxAmountOfRects = Math.floor(width/rectDimension) - xPosOffset;



export function drawFillRect(x, y, w, h){
    context.fillRect(x, y, w, h);
}

export function drawStokeRect(x, y, w, h){
    context.strokeRect(x, y, w, h);
}



export function drawRect(xPos, value, rectColor, textColor, rectangleDrawFunc){
    context.fillStyle = rectColor;
    rectangleDrawFunc((rectDimension * xPos) + (rectDimension * xPosOffset), rectYPos, rectDimension, rectDimension);
    let textSize = rectDimension/ (1 + Math.floor(Math.log10(Number(value))));

    //draws the char in a rectangle
    context.fillStyle = textColor;
    context.font = `${textSize}px arial`;
    context.fillText(value, (rectDimension * xPos) + (rectDimension * xPosOffset) + (rectDimension/10), rectYPos + rectDimension - ((1/5) * rectDimension));
}

export function drawIndexText(xPos, yPos, indexText, textColor){
    const yPosOffset = rectDimension/5;
    context.fillStyle = textColor;
    context.font = `${rectDimension/7}px arial`;
    context.fillText(indexText, (rectDimension * xPos) + (rectDimension * xPosOffset) + (rectDimension/10), yPosOffset + yPos + rectDimension);
}

export function clearIndexText(xPos){
    context.clearRect( (rectDimension * xPos) + (rectDimension * xPosOffset), rectYPos + rectDimension, width, height)
}