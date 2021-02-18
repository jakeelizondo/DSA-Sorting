function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function bubbleSort(array) {
  let swaps = 0;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      swap(array, i, i + 1);
      swaps++;
    }
  }

  if (swaps > 0) {
    return bubbleSort(array);
  }
  return array;
}

/********************************************* */

function merge(left, right, array) {
  // initialize indexes at the beginning of each of the arrays
  let leftIndex = 0;
  let rightIndex = 0;

  //initialize new array index at start
  let outputIndex = 0;

  // look at each of the arrays, move the lower first value into the new array
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    } else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  // if you hit the end of one, add the rest of the other to the merged array

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}

function mergeSort(array) {
  // base case, if the array is one value or empty just return
  if (array.length <= 1) {
    return array;
  }

  // find the middle, slice into two pieces and pass each to recursive calls of mergeSort
  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);

  //merge the two arrays together

  return merge(left, right, array);
}

/********************************************* */
function partition(array, start, end) {
  const pivot = array[end - 1];
  let pIndex = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, pIndex);
      pIndex++;
    }
  }
  swap(array, end - 1, pIndex);
  return pIndex;
}

function quickSort(array, start = 0, end = array.length) {
  // base case, return array if empty or one value
  if (start >= end) {
    return array;
  }

  //partition the array around a pivot point
  const middle = partition(array, start, end);

  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
}

// const badArray = [1, 6, 3, 9, 7, 4];
// console.time('bubblesort');
// console.log(bubbleSort(badArray));
// console.timeEnd('bubblesort');

// console.time('mergesort');
// console.log(mergeSort(badArray));
// console.timeEnd('mergesort');

// console.time('quicksort');
// console.log(quickSort(badArray));
// console.timeEnd('quicksort');

/**************************** PROBLEM 1 ********************************/

//After 3 recursive calls the array being sorted will be [21, 1, 26, 45]

//After 16 recursive calls the arrays will be sorted and will move to the merge call

//First two lists to be merged are [21] and [1]

//The lists merged on the 7th merge are the final lists

// const list = [21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40];
// mergeSort(list);

/********************************************* PROBLEM 2 *********************************/

// 1

// The pivot could have been either 14 or 17 because the following statements are true for both numbers:
// 1 - All numbers to the left are less than the number
// 2 - All numbers to the right are greater than the number

// 2

// After the second partition using last as pivot -> 3, 9, 10, 12, 19, 14, 17, 16, 13, 15
// After the second partition using first as pivot -> 9, 3, 10, 13, 12, 14, 17, 15, 19, 16

/********************************************* PROBLEM 3 *********************************/
const bigList = [
  89,
  30,
  25,
  32,
  72,
  70,
  51,
  42,
  25,
  24,
  53,
  55,
  78,
  50,
  13,
  40,
  48,
  32,
  26,
  2,
  14,
  33,
  45,
  72,
  56,
  44,
  21,
  88,
  27,
  68,
  15,
  62,
  93,
  98,
  73,
  28,
  16,
  46,
  87,
  28,
  65,
  38,
  67,
  16,
  85,
  63,
  23,
  69,
  64,
  91,
  9,
  70,
  81,
  27,
  97,
  82,
  6,
  88,
  3,
  7,
  46,
  13,
  11,
  64,
  76,
  31,
  26,
  38,
  28,
  13,
  17,
  69,
  90,
  1,
  6,
  7,
  64,
  43,
  9,
  73,
  80,
  98,
  46,
  27,
  22,
  87,
  49,
  83,
  6,
  39,
  42,
  51,
  54,
  84,
  34,
  53,
  78,
  40,
  14,
  5,
];

function swapEm(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function party(array, start, end) {
  // get pivot
  let pIndex = start;
  let pivot = array[end - 1];

  //loop over, swapping any items less than pivot with pIndex
  for (let i = start; i < end - 1; i++) {
    if (array[i] < pivot) {
      swapEm(array, i, pIndex);
      pIndex++;
    }
  }
  swapEm(array, pIndex, end - 1);
  return pIndex;
}

function qSort(array, start = 0, end = array.length) {
  // base case

  if (start >= end) {
    return array;
  }

  //identify the middle index with partitioning
  let middle = party(array, start, end);

  // pass left to qsort
  array = qSort(array, start, middle);

  //pass right to qsort
  array = qSort(array, middle + 1, end);

  //return array

  return array;
}

// console.log(qSort(bigList));

/********************************************* PROBLEM 3 *********************************/

function mergeEm(left, right) {
  // initialize new array to hold sorted order
  let combinedArray = [];
  let combinedIndex = 0;
  let leftIndex = 0;
  let rightIndex = 0;

  // loop through each, if left is greater than or equal to right add value to new, otherwise add right to new
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      combinedArray[combinedIndex] = left[leftIndex];
      leftIndex++;
      combinedIndex++;
    } else if (right[rightIndex] < left[leftIndex]) {
      combinedArray[combinedIndex] = right[rightIndex];
      rightIndex++;
      combinedIndex++;
    }
  }

  if (leftIndex < left.length) {
    for (let i = leftIndex; i < left.length; i++) {
      combinedArray.push(left[i]);
    }
  }
  if (rightIndex < right.length) {
    for (let i = rightIndex; i < right.length; i++) {
      combinedArray.push(right[i]);
    }
  }

  return combinedArray;
}

function msort(array) {
  //base case
  if (array.length <= 1) {
    return array;
  }

  // split array in 2
  let middle = Math.floor(array.length / 2);

  // pass left side to msort
  let left = array.slice(0, middle);

  left = msort(left);

  // pass right side to msort
  let right = array.slice(middle, array.length);
  right = msort(right);

  // merge sides
  array = mergeEm(left, right);
  return array;
}

const testList = [1, 4, 3, 2, 3];
console.log(msort(testList));

console.log(msort(bigList));

/********************************************* PROBLEM 4 *********************************/
