const letters = document.getElementsByClassName("letter");
const keys = document.getElementsByClassName("key");
const enter = document.getElementById("enter");
const howToPlay = document.getElementById("how-to-play");
const hint = document.getElementById("hint");
const skip = document.getElementById("skip");
const correctWord = words[Math.round(Math.random() * (words.length - 1))];
const greenColor = "rgb(172, 209, 116)";
const yellowColor = "rgb(244, 205, 74)";
const grayColor = "rgb(128, 126, 139)";

let col = 0;
let row = 0;
let userWord = "";

// letters is a HTML Collection, need to convert it into an array to use slice
let processingLetters = Array.from(letters).slice(5 * row, 5 * row + 5);
let keysArray = Array.from(keys);

for (let keyElement of keys) {
  const key = keyElement.textContent;
  keyElement.addEventListener("click", () => {
    switch (key) {
      case "enter":
        // prevent someone tries to modify HTML to make the enter button enable
        if (col < 4) {
          break;
        }
        checkWord();
        row++;
        col = 0;
        processingLetters = Array.from(letters).slice(5 * row, 5 * row + 5);
        break;

      case "del":
        // occur when user wants to delete a letter in the same row and col > 0
        if (col > 0) {
          processingLetters[col - 1].textContent = "";
          col--;
        }
        break;

      default:
        if (col >= 0 && col <= 4) {
          processingLetters[col].textContent = key;
          col++;
        }
        break;
    }
    // Update userWord
    userWord = processingLetters
      .map((processingLetter) => {
        return processingLetter.innerHTML;
      })
      .join("");

    enableOrDisableEnter();
  });
}

const isValidWord = () => {
  return words.includes(userWord);
};

/**
 * Check each letter of the userWord
 */
const checkWord = () => {
  if (userWord !== correctWord) {
    const userWordLetters = userWord.split("");
    const correctWordLetters = correctWord.split("");
    for (let i = 0; i < userWord.length; i++) {
      const pressedKey = keysArray.find((key) => {
        return key.textContent == userWordLetters[i];
      });
      if (!correctWordLetters.includes(userWordLetters[i])) {
        // Letter is not correct
        processingLetters[i].style.backgroundColor = grayColor;
        pressedKey.style.backgroundColor = grayColor;
        continue;
      }

      if (correctWordLetters[i] == userWordLetters[i]) {
        // Letter is correct
        processingLetters[i].style.backgroundColor = greenColor;
        pressedKey.style.backgroundColor = greenColor;
        continue;
      }

      if (correctWordLetters[i] !== userWordLetters[i]) {
        // Letter is correct but not in the right order
        processingLetters[i].style.backgroundColor = yellowColor;
        pressedKey.style.backgroundColor = yellowColor;
      }
    }
  }
  if (userWord === correctWord) {
    processingLetters.forEach((processingLetter) => {
      processingLetter.style.backgroundColor = greenColor;
      keysArray.forEach((key) => {
        key.disabled = true;
      });
    });
    hint.disabled = true;
  }
};

const enableOrDisableEnter = () => {
  enter.disabled = !(col >= 4 && isValidWord());
};

hint.addEventListener("click", () => {
  for (const correctLetter of correctWord) {
    const pressedKey = keysArray.find((key) => {
      return key.textContent == correctLetter;
    });
    if (
      pressedKey.style.backgroundColor !== greenColor &&
      pressedKey.style.backgroundColor !== yellowColor
    ) {
      pressedKey.style.backgroundColor = yellowColor;
      break;
    }
  }
});

skip.addEventListener("click", () => {
  location.reload();
});

// Modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
howToPlay.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

console.log(correctWord);
