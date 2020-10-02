let loader = document.querySelector(".loader");
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
    loader.style.display = "none";
    quotes = jsonData;

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

function getQuote(array, level = "high") {
  let index = chooseRandom(array);

  if (usedIndexes.length === array.length) {
    usedIndexes = [];
  }

  if (level === "medium") {
    while (index === indexPrevious) {
      index = chooseRandom(array);
    }
  } else if (level === "low") {
    while (usedIndexes.includes(index)) {
      index = chooseRandom(array);
    }
  }

  usedIndexes.push(index);

  indexPrevious = index;

  return array[index];
}

// choosing of random number just made in another function for clearness of code :)

function chooseRandom(array) {
  return Math.floor(Math.random() * array.length);
}
