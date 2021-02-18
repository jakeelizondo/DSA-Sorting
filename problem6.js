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
class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    //if no items, insert as first item
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      //move through the list until you hit a node that points to null, signifying last node
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      //the last node will now point to the new node
      tempNode.next = new _Node(item, null);
    }
  }

  insertBefore(item, keyVal) {
    //start at list head
    let currNode = this.head;
    // if no head, then list is empty
    if (!currNode) {
      return null;
    }

    //if the node containing the key value is the head, just insert first
    if (currNode.value === keyVal) {
      this.insertFirst(item);
      return;
    }

    //find the node with the keyValue, once it is the next
    while ((currNode.next.value !== keyVal) & (currNode.next.next !== null)) {
      currNode = currNode.next;
    }

    if (currNode.next.value === keyVal) {
      let tempNode = new _Node(item, currNode.next);
      currNode.next = tempNode;
    } else {
      console.log('item to insert before not found');
      return;
    }
  }

  insertAfter(item, keyVal) {
    //start at list head
    let currNode = this.head;
    // if no head, then list is empty
    if (!currNode) {
      return null;
    }

    //find the node with the keyValue, once it is the next
    while ((currNode.value !== keyVal) & (currNode.next !== null)) {
      currNode = currNode.next;
    }

    //if the node to insert after is the last node, just insert last
    if (currNode.value === keyVal && currNode.next === null) {
      this.insertLast(item);
      return;
    }

    if (currNode.value === keyVal) {
      let tempNode = new _Node(item, currNode.next);
      currNode.next = tempNode;
    } else {
      console.log('item to insert before not found');
      return;
    }
  }

  insertAt(index, item) {
    //NOTE - this function assumes 0 indexing of the list. Therefore, if you pass in the number 1 with your item to add, it will be stored in the SECOND position. Passing in 0 will store a value in the FIRST position.
    if (!this.head) {
      console.log('list is empty, nothing to insert before');
      return;
    }
    // if index is 0, just insert first
    if (index === 0) {
      this.insertFirst(item);
      return;
    }

    //else, move through list, iterating a count variable. When count === index, take current Node value and use for insertBefore
    let count = 0;
    //start at head
    let currNode = this.head;
    while (count !== index && currNode.next !== null) {
      currNode = currNode.next;
      count++;
    }
    if (count === index) {
      this.insertBefore(item, currNode.value);
      return;
    } else {
      console.log('this index does not exist');
      return;
    }
  }

  find(item) {
    //start at list head
    let currNode = this.head;
    // if no head, then list is empty
    if (!this.head) {
      return null;
    }
    //check the value of current node for the item
    while (currNode.value !== item) {
      // return null if reach end without finding item
      if (currNode.next === null) {
        return null;
      } else {
        //move to next node
        currNode = currNode.next;
      }
    }

    //sweet, found it

    return currNode;
  }

  remove(item) {
    // if list is empty return null
    if (!this.head) {
      return null;
    }

    // if node to remove its head, make next node the new head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    // start at the head otherwise
    let currNode = this.head;
    //keep track of previous node to re-route next value once on correct node to delete
    let previousNode = this.head;
    // find right node
    while (currNode !== null && currNode.value !== item) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    // if currNode is null you hit the end of the list
    if (currNode === null) {
      console.log('item not found');
    } else {
      //otherwise, set the previous node to point to the next node, dropping out the node to delete
      previousNode.next = currNode.next;
    }
  }
}

function main() {
  let SLL = new LinkedList();
  let insertion = [1, 7, 3, 5, 17];
  insertion.map((item) => SLL.insertLast(item));

  return SLL;
}

console.dir(main(), { depth: null });
