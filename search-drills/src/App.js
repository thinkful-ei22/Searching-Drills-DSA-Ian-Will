import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      results: null
    }
  }

  binarySearch(array, value, start, end, counter = 0) {
    counter++;
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;

    if (start > end) {
      return `Couldn't find your number.  We tried ${counter} times`;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    console.log(start, end);
    if (item == value) {
      return `We found your number after ${counter} searches`;
    }
    else if (item < value) {
      return this.binarySearch(array, value, index + 1, end, counter);
    }
    else if (item > value) {
      return this.binarySearch(array, value, start, index - 1, counter);
    }
  };

  initializeBinarySearchFunction(lookingFor) {
    const array = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13,
      40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98,
      73, 28, 16, 46, 87, 28, 65, 38,
      67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3,
      7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7,
      64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54,
      84, 34, 53, 78, 40, 14, 5];

    const sortedArray = array.sort((a, b) => a - b);

    return this.binarySearch(sortedArray, lookingFor, sortedArray[0], sortedArray[sortedArray.length - 1]);


  }

  linearSearchFunction(lookingFor) {
    const array = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53,
      55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44,
      21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38,
      67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3,
      7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7,
      64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54,
      84, 34, 53, 78, 40, 14, 5]

    let counter = 0;
    for (let i = 0; i < array.length; i++) {
      counter++;
      if (array[i] === lookingFor) {
        return `We found your number and it took us ${counter} searches.`;
      }
    }
    return `We didn't find your number.`;
  }

  handleSubmit(event) {
    event.preventDefault();
    let lookingFor = parseInt(event.target.number.value);
    const results = this.initializeBinarySearchFunction(lookingFor);
    this.setState({ results });
  }

  render() {
    let resultElement =
      <div>
        {this.state.results}
      </div>

    return (
      <div className="App">
        {resultElement}
        <form onSubmit={e => this.handleSubmit(e)}>
          <input name="number" type="number" className="search-input" />
          <button className="submit" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
