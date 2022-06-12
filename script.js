let letters = document.getElementsByClassName("letter");
let keys = document.getElementsByClassName("key");
let col = 0;
let row = 0;
// letters is a HTML Collection, need to convert it into an array to use slice
let processingLetters = Array.from(letters).slice(5 * row, 5 * row + 5);

for (let keyElement of keys) {
  let key = keyElement.textContent;
  keyElement.addEventListener("click", () => {
    switch (key) {
      case "enter":
        // only running when 5 letters are there
        if (col < 4) {
          break;
        }
        const userWord = processingLetters
          .map((processingLetter) => {
            return processingLetter.innerHTML;
          })
          .join("");

        const isValid = checkWord(userWord, row);

        if (isValid) {
          row++;
          col = 0;
          processingLetters = Array.from(letters).slice(5 * row, 5 * row + 5);
        }
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
  });
}

const correctWord = words[Math.round(Math.random() * (words.length - 1))];

const checkWord = (userWord, row) => {
  if (!words.includes(userWord)) {
    // Invalid word, word does not exist in the library
    return false;
  }
  if (userWord !== correctWord) {
    const userWordLetters = userWord.split("");
    const correctWordLetters = correctWord.split("");
    for (let i = 0; i < userWord.length; i++) {
      if (!correctWordLetters.includes(userWordLetters[i])) {
        // Letter is not correct
        processingLetters[i].style.backgroundColor = "gray";
        continue;
      }

      if (correctWordLetters[i] == userWordLetters[i]) {
        // Letter is correct
        processingLetters[i].style.backgroundColor = "green";
        continue;
      }

      if (correctWordLetters[i] !== userWordLetters[i]) {
        // Letter is correct but not in the right order
        processingLetters[i].style.backgroundColor = "yellow";
      }
    }
  }
  if (userWord === correctWord) {
    processingLetters.forEach((processingLetter) => {
      processingLetter.style.backgroundColor = "green";
    });
  }
  return true;
};

console.log(correctWord);
