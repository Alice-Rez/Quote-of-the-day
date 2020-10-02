// I created three different options of randomization :

// 1.) low - it will display all of the elements in random order without repeating

//2.) medium - there can be repetitions but not direct - next element will be everytime different that previous one

// 3.) hight - totally random with possibility of repetition :)

let board = document.getElementById("board");
let author = document.getElementById("author");
let buttonLow = document.getElementById("low-level");
let buttonMedium = document.getElementById("medium-level");
let buttonHigh = document.getElementById("high-level");

// these variables I need for the cases of low and medium randomization

let indexPrevious = "";
let usedIndexes = [];

fetch("https://philosophy-quotes-api.glitch.me/quotes")
  .then((res) => {
    return res.json();
  })
  .then((jsonData) => {
    quotes = jsonData;

    console.log(quotes);
    board.textContent = `${getQuote(quotes).quote}`;
    author.textContent = `${quotes[indexPrevious].source}`;

    buttonLow.addEventListener("click", () => {
      console.log("medium button clicked");
      board.textContent = `${getQuote(quotes, "low").quote}`;
      author.textContent = `${quotes[indexPrevious].source}`;
    });

    buttonMedium.addEventListener("click", () => {
      console.log("medium button clicked");
      board.textContent = `${getQuote(quotes, "medium").quote}`;
      author.textContent = `${quotes[indexPrevious].source}`;
    });

    buttonHigh.addEventListener("click", () => {
      console.log("high button clicked");
      board.textContent = `${getQuote(quotes).quote}`;
      author.textContent = `${quotes[indexPrevious].source}`;
    });
  });

// the main function is same, because the basics are the same

// we just have another parameter, that decide, which level of randomization we want so which part of code will be additionally executed

//also with high and medium randomization the indexes will be stored everytime in the array usedIndexes, because than I can switch to the low and effect is nearly immediate

// same for indexPrevious variable

// console logs just for checking

function getQuote(array, level = "hight") {
  let index = chooseRandom(array);

  console.log(indexPrevious, usedIndexes);

  if (usedIndexes.length === array.length) {
    usedIndexes = [];
  }

  if (level === "medium") {
    while (index === indexPrevious) {
      console.log("new index needed");
      index = chooseRandom(array);
    }
  } else if (level === "low") {
    while (usedIndexes.includes(index)) {
      console.log("new index needed");
      index = chooseRandom(array);
    }
  }

  usedIndexes.push(index);

  indexPrevious = index;

  console.log(index, array[index]);

  return array[index];
}

// choosing of random number just amde in another function for clearness of code :)

function chooseRandom(array) {
  return Math.floor(Math.random() * array.length);
}