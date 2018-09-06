'use strict';

//---------------FIND A BOOK------------------------

//input given a DD number, how would you find it....
//could use a binary search to more efficiently search through libraries,
//list of DD books...

//library input is an array of dd numbers representing all the books in library
//book is the DD number of the book we are looking for,
//start and end and the first and last values of the array

function binaryDeweySearch(library, book, start, end) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? library.length : end;

    if (start > end) {
        return "could not find book";
    }

    const index = Math.floor((start + end) / 2);
    const item = library[index];

    console.log(start, end);
    if (item == book) {
        return `found your book! ${index}`;
    }
    else if (item < book) {
        return binaryDeweySearch(library, book, index + 1, end);
    }
    else if (item > book) {
        return binaryDeweySearch(library, book, start, index - 1);
    }
};


//--------tree traversal-------------------------


class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    dfs(values = []) {
        if (this.left) {
            values = this.left.dfs(values);
        }
        values.push(this.value);

        if (this.right) {
            values = this.right.dfs(values);
        }
        return values;
    }
    bfs(values = []) {
        const queue = [this];

        while (queue.length) {
            const node = queue.shift();
            values.push(node.value);

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }
        return values;
    }
}

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
      this.key = key;
      this.value = value;
      this.parent = parent;
      this.left = null;
      this.right = null;
    }
  
    insert(key, value) {
      //if the tree is empty then this key being inserted is the root node of the tree
      if (this.key == null) {
        this.key = key;
        this.value = value;
      }
  
      //If the tree already exist, then start at the root, 
      //and compare it to the key you want to insert
      // If the new key is less than the node's key 
      //then the new node needs to live in the left-hand branch.
      else if (key < this.key) {
        //if the existing node does not have any left child, 
        //meaning that if the `left` pointer is empty 
        //then we can just instantiate and insert the new node 
        //as the left child of that node, passing `this` as the parent.  
        if (this.left == null) {
          this.left = new BinarySearchTree(key, value, this);
        }
        //if the node has an existing left child, 
        //then we recursively call the `insert` method 
        //so the node is added further down the tree.
        else {
          this.left.insert(key, value);
        }
      }
      //Similarly, if the new key is greater than the node's key 
      //then you do the same thing, but on the right-hand side.
      else {
        if (this.right == null) {
          this.right = new BinarySearchTree(key, value, this);
        }
        else {
          this.right.insert(key, value);
        }
      }
    }
  
    find(key) {
      //if the item is found at the root then return that value
      if (this.key == key) {
        return this.value;
      }
      //if the item you are looking for is less than the root 
      //then follow the left child
      //if there is an existing left child, 
      //then recursively check its left and/or right child
      //until you find the item.
      else if (key < this.key && this.left) {
        return this.left.find(key);
      }
      //if the item you are looking for is greater than the root 
      //then follow the right child
      //if there is an existing right child, 
      //then recursively check its left and/or right child
      //until you find the item.
      else if (key > this.key && this.right) {
        return this.right.find(key);
      }
      //You have search the treen and the item is not in the tree
      else {
        throw new Error('Key Error');
      }
    }
  
    _replaceWith(node) {
      if (this.parent) {
        if (this == this.parent.left) {
          this.parent.left = node;
        }
        else if (this == this.parent.right) {
          this.parent.right = node;
        }
  
        if (node) {
          node.parent = this.parent;
        }
      }
      else {
        if (node) {
          this.key = node.key;
          this.value = node.value;
          this.left = node.left;
          this.right = node.right;
        }
        else {
          this.key = null;
          this.value = null;
          this.left = null;
          this.right = null;
        }
      }
    }
  
    _findMin() {
      if (!this.left) {
        return this;
      }
      return this.left._findMin();
    }
  
    _findMax() {
      if (!this.right){
        return this;
      }
      return this.right._findMax();
    }
  
    remove(key) {
      if (this.key == key) {
        if (this.left && this.right) {
          const successor = this.right._findMin();
          this.key = successor.key;
          this.value = successor.value;
          successor.remove(successor.key);
        }
        //If the node only has a left child, 
        //then you replace the node with its left child.  
        else if (this.left) {
          this._replaceWith(this.left);
        }
        //And similarly if the node only has a right child 
        //then you replace it with its right child.
        else if (this.right) {
          this._replaceWith(this.right);
        }
        //If the node has no children then
        //simply remove it and any references to it 
        //by calling "this._replaceWith(null)".
        else {
          this._replaceWith(null);
        }
      }
      else if (key < this.key && this.left) {
        this.left.remove(key);
      }
      else if (key > this.key && this.right) {
        this.right.remove(key);
      }
      else {
        throw new Error('Key Error');
      }
    }
    preOrder(keys=[]) {
        keys.push(this.key);
        if (this.left) {
            keys = this.left.preOrder(keys);
        }
        if (this.right) {
            keys = this.right.preOrder(keys);
        }
        return keys;
    }
    inOrder(keys=[]) {
        if (this.left) {
            keys = this.left.inOrder(keys);
        }
        keys.push(this.key);
        if (this.right) {
            keys = this.right.inOrder(keys);
        }
        return keys;
    }
    postOrder(keys=[]) {
        if (this.left) {
            keys = this.left.postOrder(keys);
        }
        if (this.right) {
            keys = this.right.postOrder(keys);
        }
        keys.push(this.key);
        return keys;
    }
  }

const main = () => {
    let testTree = new BinarySearchTree(25);
    testTree.insert(15);
    testTree.insert(50);
    testTree.insert(10);
    testTree.insert(24);
    testTree.insert(35);
    testTree.insert(70);
    testTree.insert(4);
    testTree.insert(12);
    testTree.insert(18);
    testTree.insert(31);
    testTree.insert(44);
    testTree.insert(66);
    testTree.insert(90);
    testTree.insert(22);
    // return testTree.preOrder();
    // return testTree.inOrder();
    return testTree.postOrder();
}

console.log(main());