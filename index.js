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
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end - 1, j);
  return j;
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

const badArray = [1, 6, 3, 9, 7, 4];
console.time('bubblesort');
console.log(bubbleSort(badArray));
console.timeEnd('bubblesort');

console.time('mergesort');
console.log(mergeSort(badArray));
console.timeEnd('mergesort');

console.time('quicksort');
console.log(quickSort(badArray));
console.timeEnd('quicksort');
