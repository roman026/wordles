let resultElement = document.querySelector(".result");
let mainContainer = document.querySelector(".main-container");
let rowId = 1;

let word = palabras[Math.floor(Math.random() * palabras.length)];
let wordArray = word.toUpperCase().split("");
console.log(wordArray);

let actualRow = document.querySelector(".row");

drawSquares(actualRow);
listenInput(actualRow);
addFocus(actualRow);

function listenInput(actualRow) {
  let squares = actualRow.querySelectorAll(".square");
  squares = [...squares];

  let userInput = [];

  squares.forEach((element) => {
    element.addEventListener("input", (event) => {
      if (event.inputType !== "deleteContentBackward") {
        //Recoger el ingreso del usuario
        userInput.push(event.target.value.toUpperCase());

        if (event.target.nextElementSibling) {
          event.target.nextElementSibling.focus();
        } else {
          let squaresFilled = document.querySelectorAll(".square");
          squaresFilled = [...squaresFilled];

          let lastFiveSquaresFilled = squaresFilled.slice(-wordArray.length);
          let finalUserInput = [];
          lastFiveSquaresFilled.forEach((element) => {
            finalUserInput.push(element.value.toUpperCase());
          });

          //comparar arreglo para cambiar estilos
          let rightIndex = compareArrays(wordArray, finalUserInput);

          rightIndex.forEach((element) => {
            squares[element].classList.add("green");
          });
          if (rightIndex.length === wordArray.length) {
            showResult("Ganaste!!");
            return;
          }

          //Cambiar estilos si existe la letra pero no en la posicion correcta
          let existIndexArray = existLetter(wordArray, finalUserInput);
          existIndexArray.forEach((element) => {
            squares[element].classList.add("gold");
          });
          //crear una nueva fila
          let actualRow = createRow();
          if (!actualRow) {
            return;
          }
          drawSquares(actualRow);
          listenInput(actualRow);
          addFocus(actualRow);
        }
      } else {
        userInput.pop();
      }
    });
  });
}

//FUNCIONES

function compareArrays(array1, array2) {
  let iqualsIndex = [];
  array1.forEach((element, index) => {
    if (element == array2[index]) {
      iqualsIndex.push(index);
    } else {
    }
  });
  return iqualsIndex;
}

function existLetter(array1, array2) {
  let existIndexArray = [];
  array2.forEach((element, index) => {
    if (array1.includes(element)) {
      existIndexArray.push(index);
    }
  });
  return existIndexArray;
}

function createRow() {
  rowId++;
  if (rowId <= 5) {
    let newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.setAttribute("id", rowId);
    mainContainer.appendChild(newRow);
    return newRow;
  } else {
    showResult(
      `Intentalo de nuevo, la palabra correcta era "${word.toUpperCase()}"`
    );
  }
}

function drawSquares(actualRow) {
  wordArray.forEach((item, index) => {
    if (index == 0) {
      actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus" />`;
    } else {
      actualRow.innerHTML += `<input type="text" maxlength="1" class="square" />`;
    }
  });
}

function addFocus(actualRow) {
  let focusElement = actualRow.querySelector(".focus");

  focusElement.focus();
}

function showResult(textMsg) {
  resultElement.innerHTML = `<p> ${textMsg}</p> <button class= "button">Reiniciar</button>`;
  let resetBtn = document.querySelector(".button");
  resetBtn.addEventListener("click", () => {
    location.reload();
  });
}
