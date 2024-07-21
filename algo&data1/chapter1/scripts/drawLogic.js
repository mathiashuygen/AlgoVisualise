export const canvas = document.querySelector(".AlgorithmVisualiser");
export const context = canvas.getContext("2d");
export const width = window.innerWidth - 10;
export const height = window.innerHeight/1.5;
canvas.width = width;
canvas.height = height;


export function drawFillRect(x, y, w, h){
    context.fillRect(x, y, w, h);
}

export function drawStokeRect(x, y, w, h){
    context.strokeRect(x, y, w, h);
}


export function drawRectWithInputString(string, x, y, rectDimension, textSize, stringIndex, rectColor, textColor, rectangleDrawFunc){
        //draws the rectangle
        context.fillStyle = rectColor;
        rectangleDrawFunc((rectDimension * x), y, rectDimension, rectDimension);

        //draws the char in a rectangle
        context.fillStyle = textColor;
        context.font = `${textSize}px arial`;
        context.fillText(string[stringIndex], (rectDimension * x) + (rectDimension/10), rectDimension - ((1/5) * rectDimension));   
}


export function drawRectWithPattern(pattern, x, y, rectDimension, textSize, stringIndex, rectClor, textColor, rectangleDrawFunc){
        //draws the rectangle
        context.fillStyle = rectClor;
        rectangleDrawFunc((rectDimension * x), y, rectDimension, rectDimension);

        //draws the char in a rectangle
        context.fillStyle = textColor;
        context.font = `${textSize}px arial`;
        context.fillText(pattern[stringIndex], (rectDimension * x) + (rectDimension/10), 2*rectDimension - ((1/5) * rectDimension));
}


export function drawInputString(string, rectangleDimension, textSize){
    for(let i = 0; i < string.length; i++){
        drawRectWithInputString(string, i, 0, rectangleDimension, textSize, i, "black", "black", drawStokeRect);
    }
}


export function drawPattern(pattern, startingPoint, rectangleDimension, textSize){
    let indexInString = 0;
    for(let i = startingPoint; indexInString < pattern.length; i++){
        drawRectWithPattern(pattern, i, rectangleDimension, rectangleDimension, textSize, indexInString, "black", "black", drawStokeRect);
        indexInString += 1;
    }
}


export function resetInputRectangle(string, rectangleDimension){
    for(let i = 0; i < string.length; i++){
        context.clearRect(rectangleDimension * i, 0, rectangleDimension, rectangleDimension);
    }
}

export function resetPatternRectangle(pattern, startingPoint, rectangleDimension){
    let indexInString = 0;
    for(let i = startingPoint; indexInString < pattern.length; i++){
        context.clearRect(rectangleDimension * i, rectangleDimension, rectangleDimension, rectangleDimension);
        indexInString += 1;

    }
}


export function movePattern(previousStartingPoint, newStartingPoint, rectangleDimension, pattern, patternLength){
    resetPatternRectangle(pattern, previousStartingPoint, rectangleDimension);
    drawPattern(pattern, newStartingPoint, rectangleDimension, rectangleDimension);
    
}

