import {
  resetButton,
  executionSlider,
  pauseButton,
  changeSliderValue,
} from "./buttons.js";
import {
  drawFillRect,
  drawRect,
  drawIndexText,
  clearIndexText,
  width,
  height,
  context,
  rectYPos,
  overlappingTextYPos,
  rectDimension,
  drawStokeRect,
} from "./drawLogic.js";

//default of 1s sleep.
const defaultFunctionExecutionSpeed = 1000;
var executionSpeedFactor = executionSlider.value;

function UpdateExecutionSpeed() {
  let sliderValue = executionSlider.value;
  changeSliderValue(`x${sliderValue}`);
  console.log(sliderValue);
  executionSpeedFactor = sliderValue;
}

executionSlider.addEventListener("input", UpdateExecutionSpeed);

var reset = false;

//resets the canvas.
function resetCanvas() {
  reset = true;
}

resetButton.addEventListener("click", resetCanvas);

var paused = false;
function updatePauseButton() {
  if (paused) {
    paused = false;
    pauseButton.textContent = "||";
  } else {
    paused = true;
    pauseButton.textContent = "▷";
  }
}

pauseButton.addEventListener("click", updatePauseButton);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

var outputArray = [];

function stepVisualiser(idx1, idx2, rectColor, textColor, drawRectFunc, array) {
  drawRect(idx1, rectYPos, array[idx1], rectColor, textColor, drawRectFunc);
  drawRect(idx2, rectYPos, array[idx2], rectColor, textColor, drawRectFunc);
}

function colorArray(array, color) {
  for (let i = 0; i < array.length; i++) {
    drawRect(i, rectYPos, array[i], color, "black", drawFillRect);
  }
}

export function displayArray(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
}

function drawPartArray(array, from, until, xPosSpacing, YPos, rectColor) {
  for (let i = from; i <= until; i++) {
    drawRect(i + xPosSpacing, YPos, array[i], rectColor, "black", drawFillRect);
    console.log("drawpart");
  }
}

export async function VisualBubbleSort(arrayToSort) {
  var unsorted_idx = arrayToSort.length - 2;
  var inner_idx = 0;
  var has_changed = false;

  async function bubble_swap(idx1, idx2) {
    let keep = arrayToSort[idx1];
    arrayToSort[idx1] = arrayToSort[idx2];
    arrayToSort[idx2] = keep;

    stepVisualiser(idx1, idx2, "grey", "black", drawFillRect, arrayToSort);

    await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);

    stepVisualiser(idx1, idx2, "red", "black", drawFillRect, arrayToSort);
    await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
    return true;
  }

  async function inner_loop() {
    if (inner_idx !== unsorted_idx) {
      drawIndexText(inner_idx, rectYPos, "inner idx", "green");
      drawIndexText(unsorted_idx, rectYPos, "unsorted idx", "purple");
    } else {
      drawIndexText(inner_idx, overlappingTextYPos, "inner idx", "green");
      drawIndexText(unsorted_idx, rectYPos, "unsorted idx", "purple");
    }
    if (inner_idx > unsorted_idx) {
      drawRect(
        inner_idx,
        rectYPos,
        arrayToSort[inner_idx],
        "green",
        "black",
        drawFillRect,
      );
      await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
      outputArray.push("outer");
      outputArray.push(has_changed);
      return 0;
    } else {
      outputArray.push("inner");

      //new value for inner_idx
      outputArray.push(inner_idx + 1);

      //new value for has_changed
      stepVisualiser(
        inner_idx,
        inner_idx + 1,
        "grey",
        "black",
        drawFillRect,
        arrayToSort,
      );
      await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);

      if (arrayToSort[inner_idx + 1] < arrayToSort[inner_idx]) {
        stepVisualiser(
          inner_idx,
          inner_idx + 1,
          "purple",
          "black",
          drawFillRect,
          arrayToSort,
        );
        await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);

        outputArray.push(await bubble_swap(inner_idx, inner_idx + 1));
        return 0;
      } else {
        outputArray.push(has_changed);
        return 0;
      }
    }
  }

  outputArray.push("begin");

  while (true) {
    clearIndexText(inner_idx);
    clearIndexText(unsorted_idx);

    if (reset) {
      context.clearRect(0, 0, width, height);
      reset = false;
      outputArray = [];
      outputArray.push("begin");
      return 0;
    } else if (!paused) {
      let loopToRun = outputArray[0];

      if (loopToRun === "begin") {
        if (unsorted_idx >= 0) {
          outputArray = [];
          outputArray.push("inner");
          outputArray.push(0);
          outputArray.push(false);
        } else {
          paused = true;
        }
      } else if (loopToRun === "outer") {
        if (outputArray[1]) {
          unsorted_idx = unsorted_idx - 1;
          outputArray = [];
          if (unsorted_idx >= 0) {
            outputArray.push("inner");
            outputArray.push(0);
            outputArray.push(false);
          } else {
            paused = true;
            colorArray(arrayToSort, "green");
          }
        } else {
          paused = true;
          colorArray(arrayToSort, "green");
        }
      } else if (loopToRun === "inner") {
        inner_idx = outputArray[1];
        has_changed = outputArray[2];
        outputArray = [];
        await inner_loop();
      }
    } else {
      await sleep(200);
    }
  }
}

export async function VisualInsertionSort(arrayToSort) {
  var outer_idx = arrayToSort.length - 2;
  var inner_idx = outer_idx + 1;

  var outputArray = [];

  async function swap(idx1, idx2) {
    let keep = arrayToSort[idx1];
    arrayToSort[idx1] = arrayToSort[idx2];
    arrayToSort[idx2] = keep;

    stepVisualiser(
      inner_idx,
      outer_idx,
      "grey",
      "black",
      drawFillRect,
      arrayToSort,
    );
    await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
    stepVisualiser(idx1, idx2, "red", "black", drawFillRect, arrayToSort);
    await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
    return 0;
  }

  async function inner_loop() {
    if (!(inner_idx >= arrayToSort.length)) {
      stepVisualiser(
        inner_idx,
        outer_idx,
        "grey",
        "black",
        drawFillRect,
        arrayToSort,
      );
      await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
    }

    if (inner_idx >= arrayToSort.length) {
      outputArray.push("outer");
      outputArray.push(outer_idx - 1);
      outputArray.push(outer_idx);
      return 0;
    } else if (arrayToSort[inner_idx] > arrayToSort[outer_idx]) {
      drawRect(
        inner_idx,
        rectYPos,
        arrayToSort[inner_idx],
        "green",
        "black",
        drawFillRect,
      );
      outputArray.push("outer");
      outputArray.push(outer_idx - 1);
      outputArray.push(outer_idx);
      return 0;
    } else {
      stepVisualiser(
        inner_idx,
        outer_idx,
        "purple",
        "black",
        drawFillRect,
        arrayToSort,
      );
      await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);

      swap(outer_idx, inner_idx);
      outputArray.push("inner");
      outputArray.push(inner_idx);
      outputArray.push(inner_idx + 1);
      return 0;
    }
  }

  outputArray.push("begin");

  while (true) {
    if (reset) {
      context.clearRect(0, 0, width, height);
      reset = false;
      outputArray = [];
      outputArray.push("begin");
      return 0;
    } else if (!paused) {
      let loopToRun = outputArray[0];

      if (loopToRun === "begin") {
        outputArray = [];
        outputArray.push("inner");
        outputArray.push(outer_idx);
        outputArray.push(inner_idx);
      } else if (loopToRun === "outer") {
        outer_idx = outputArray[1];
        inner_idx = outputArray[2];

        if (outer_idx < 0) {
          colorArray(arrayToSort, "green");
          return 0;
        } else {
          outputArray = [];
          outputArray.push("inner");
          outputArray.push(outer_idx);
          outputArray.push(inner_idx);
        }
      } else if (loopToRun === "inner") {
        outer_idx = outputArray[1];
        inner_idx = outputArray[2];
        outputArray = [];
        await inner_loop();
      }
    } else {
      await sleep(200);
    }
  }
}

export async function VisualSelectionSort(arrayToSort) {
  var outer_idx = 0;
  var inner_idx = outer_idx + 1;
  var smallest_idx = outer_idx;

  var outputArray = [];

  async function swap(idx1, idx2) {
    let keep = arrayToSort[idx1];
    arrayToSort[idx1] = arrayToSort[idx2];
    arrayToSort[idx2] = keep;

    stepVisualiser(idx1, idx2, "red", "black", drawFillRect, arrayToSort);
    await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);

    return 0;
  }

  async function inner_loop() {
    //drawRect(smallest_idx, arrayToSort[smallest_idx], "orange", "black", drawFillRect);

    if (outer_idx === smallest_idx) {
      drawIndexText(inner_idx, rectYPos, "inner idx", "blue");
      drawIndexText(outer_idx, rectYPos, "outer idx", "purple");
      drawIndexText(smallest_idx, overlappingTextYPos, "smallest idx", "green");
    } else {
      drawIndexText(inner_idx, rectYPos, "inner idx", "blue");
      drawIndexText(outer_idx, rectYPos, "outer idx", "purple");
      drawIndexText(smallest_idx, rectYPos, "smallest idx", "green");
    }
    await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);

    if (inner_idx >= arrayToSort.length) {
      await swap(outer_idx, smallest_idx);
      drawRect(
        outer_idx,
        rectYPos,
        arrayToSort[outer_idx],
        "green",
        "black",
        drawFillRect,
      );
      outputArray.push("outer");
      outputArray.push(outer_idx);
    } else if (arrayToSort[inner_idx] < arrayToSort[smallest_idx]) {
      outputArray.push("inner");
      outputArray.push(inner_idx + 1);
      outputArray.push(inner_idx);
    } else {
      outputArray.push("inner");
      outputArray.push(inner_idx + 1);
      outputArray.push(smallest_idx);
    }
  }

  outputArray.push("begin");

  while (true) {
    if (reset) {
      context.clearRect(0, 0, width, height);
      reset = false;
      outputArray = [];
      outputArray.push("begin");
      return 0;
    } else if (!paused) {
      clearIndexText(outer_idx);
      clearIndexText(inner_idx);
      clearIndexText(smallest_idx);

      var loopToRun = outputArray[0];

      if (loopToRun === "begin") {
        outputArray = [];
        outputArray.push("inner");
        outputArray.push(inner_idx);
        outputArray.push(smallest_idx);
      }

      if (loopToRun === "outer") {
        outer_idx = outputArray[1];

        if (outer_idx < arrayToSort.length - 1) {
          outer_idx = outer_idx + 1;
          inner_idx = outer_idx + 1;
          smallest_idx = outer_idx;

          outputArray = [];
          outputArray.push("inner");
          outputArray.push(inner_idx);
          outputArray.push(smallest_idx);
        } else {
          //algorithm is done
          displayArray(arrayToSort);
          return 0;
        }
      } else if (loopToRun === "inner") {
        inner_idx = outputArray[1];
        smallest_idx = outputArray[2];
        outputArray = [];
        await inner_loop();
      }
    } else {
      await sleep(200);
    }
  }
}

export async function VisualQuickSort(arrayToSort) {
  async function swap(idx1, idx2) {
    stepVisualiser(idx1, idx2, "grey", "black", drawFillRect, arrayToSort);
    await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);

    let keep = arrayToSort[idx1];
    arrayToSort[idx1] = arrayToSort[idx2];
    arrayToSort[idx2] = keep;
    stepVisualiser(idx1, idx2, "red", "black", drawFillRect, arrayToSort);
    await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);

    return 0;
  }

  async function shift_to_right(i, x) {
    if (arrayToSort[i] < x) {
      return await shift_to_right(i + 1, x);
    } else {
      return i;
    }
  }

  async function shift_to_left(j, x) {
    if (x < arrayToSort[j]) {
      return await shift_to_left(j - 1, x);
    } else {
      return j;
    }
  }

  async function partition(pivot, i, j) {
    let shifted_i = await shift_to_right(i, pivot);
    let shifted_j = await shift_to_left(j, pivot);

    if (shifted_i < shifted_j) {
      await swap(shifted_i, shifted_j);
      return await partition(pivot, shifted_i, shifted_j - 1);
    } else {
      return shifted_j;
    }
  }

  async function quickSortMain(l, r) {
    if (l === r) {
      drawIndexText(r, rectYPos, "r", "black");
      drawIndexText(l, overlappingTextYPos, "pivot", "black");
    } else {
      drawIndexText(r, rectYPos, "r", "black");
      drawIndexText(l, rectYPos, "pivot", "black");
    }

    if (l < r) {
      if (arrayToSort[r] < arrayToSort[l]) {
        await swap(l, r);
        await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
      }
      let m = await partition(arrayToSort[l], l + 1, r - 1);
      if (m === l) {
        drawIndexText(m, overlappingTextYPos, "m", "black");
        await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
      } else {
        drawIndexText(m, rectYPos, "m", "black");
        await sleep(defaultFunctionExecutionSpeed / executionSpeedFactor);
      }
      await swap(l, m);
      clearIndexText(l);
      clearIndexText(r);
      await quickSortMain(l, m - 1);
      await quickSortMain(m + 1, r);

      return 0;
    }

    clearIndexText(l);
    clearIndexText(r);
  }

  await quickSortMain(0, arrayToSort.length - 1);
  colorArray(arrayToSort, "green");
}

function makeArray(length) {
  let outputArray = [];
  for (let i = 0; i < length; i++) {
    outputArray.push(0);
  }
  return outputArray;
}






//archived visual merge sort because I really have no idea how to properly visualise it. Moving on to chapter 2.
/*
export async function VisualMergeSort(arrayToSort) {
  const spacing = rectDimension / 3 + rectDimension;
  var pairs = 0;


  function merge(mergeArray, p, q, r, recursionDepth) {
    let workingArray = makeArray(r - p + 1);

    function copy_back(a, b) {
      mergeArray[b] = workingArray[a];
      if (a < workingArray.length - 1) {
        return copy_back(a + 1, b + 1);
      }
    }

    function flush_remaining(k, i, until) {
      workingArray[k] = mergeArray[i];
      if (i < until) {
        flush_remaining(k + 1, i + 1, until);
      } else {
        copy_back(0, p);
      }
    }

    function merge_iter(k, i, j) {
      if (i <= q && j <= r) {
        let low1 = mergeArray[i];
        let low2 = mergeArray[j];

        if (low1 < low2) {
          workingArray[k] = low1;
          merge_iter(k + 1, i + 1, j);
        } else {
          workingArray[k] = low2;
          merge_iter(k + 1, i, j + 1);
        }
      } else if (i <= q) {
        flush_remaining(k, i, q);
      } else {
        flush_remaining(k, j, r);
      }
    }

    merge_iter(0, p, q + 1);
  }

  async function merge_sort_rec(array, p, r, recurDepth) {
    if (p < r) {
      //every single time this if check succeeds the part of the array from p to r get split in two => draw these two new arrays

      let q = Math.floor((r + p) / 2);
      if (r - p === 1) {
        
        drawPartArray(array, p, p, -recurDepth + pairs, recurDepth * spacing + rectYPos, "red");

        drawPartArray(array, r, r, -recurDepth + pairs + 1, recurDepth * spacing + rectYPos, "red");

        pairs += 2;
      }

      if (r - p === 2) {
        drawPartArray(array, r, r, -recurDepth + pairs, recurDepth * spacing + rectYPos, "red");
      }
      merge_sort_rec(array, p, q, recurDepth + 1);
      merge_sort_rec(array, q + 1, r, recurDepth + 1);
      merge(array, p, q, r, recurDepth);
    } else {
      return 0;
    }
  }
  merge_sort_rec(arrayToSort, 0, arrayToSort.length - 1, 1);
}

*/
