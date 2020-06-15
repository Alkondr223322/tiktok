// import "./generateField.js";
// import "./tools.js";

const listOfCells = document.querySelectorAll("[data-id]");
const storage = localStorage;

// CLEAR EVERYTHING
// storage.setItem('moves', '');
// storage.setItem('move', '0');
// storage.setItem('undoneMoves', '');

function checkField(id, cellClass) {
  let win = true;
  let draw = true;
  let winCells = [];
  // COLUMN
  const col = id % ROWS_COUNT;
  for (let i = col; i < listOfCells.length; i += COLS_COUNT) {
    if (!listOfCells[i].classList.contains(cellClass)) win = false;
  }
  if (win) {
    for (let i = col; i < listOfCells.length; i += COLS_COUNT) {
      winCells.push(listOfCells[i]);
    }
    declareWinner(cellClass, "vertical", winCells);
    return;
  }
  // ROWS
  win = true;
  winCells = [];
  const row = Math.floor(id / COLS_COUNT);
  for (let i = 0; i < COLS_COUNT; i += 1) {
    if (!listOfCells[i + ROWS_COUNT * row].classList.contains(cellClass))
      win = false;
  }
  if (win) {
    for (let i = 0; i < COLS_COUNT; i += 1) {
      winCells.push(listOfCells[i + ROWS_COUNT * row]);
    }
    declareWinner(cellClass, "horizontal", winCells);
    return;
  }
  // RIGHT DIAGONAL
  if (row === col) {
    win = true;
    winCells = [];
    for (let i = 0; i < listOfCells.length; i += COLS_COUNT + 1) {
      if (!listOfCells[i].classList.contains(cellClass)) win = false;
    }
    if (win) {
      for (let i = 0; i < listOfCells.length; i += COLS_COUNT + 1) {
        winCells.push(listOfCells[i]);
      }
      declareWinner(cellClass, "diagonal-right", winCells);
      return;
    }
  }
  // LEFT DIAGONAL
  win = true;
  winCells = [];
  for (
    let i = COLS_COUNT - 1;
    i < listOfCells.length - COLS_COUNT + 1;
    i += COLS_COUNT - 1
  ) {
    if (!listOfCells[i].classList.contains(cellClass)) win = false;
  }
  if (win) {
    for (
      let i = COLS_COUNT - 1;
      i < listOfCells.length - COLS_COUNT + 1;
      i += COLS_COUNT - 1
    ) {
      winCells.push(listOfCells[i]);
    }
    declareWinner(cellClass, "diagonal-left", winCells);
    return;
  }
  // CHECK IF DRAW
  for (let i = 0; i < listOfCells.length; i += 1) {
    if (
      !listOfCells[i].classList.contains("ch") &&
      !listOfCells[i].classList.contains("r")
    )
      draw = false;
  }
  if (draw && document.querySelector(".won-message").innerHTML.length === 0)
    declareWinner("draw", "", "");
}

function updateData() {
  document.querySelector(".won-title").classList.add("hidden");
  document.querySelector(".won-message").innerHTML = "";
  for (let i = 0; i < listOfCells.length; i += 1) {
    listOfCells[i].className = "";
    listOfCells[i].classList.add("cell");
  }
  const arrOfMoves = storage.getItem("moves").split(" ");
  for (let i = 1; i < arrOfMoves.length; i += 1) {
    doMove(arrOfMoves[i]);
  }
  if (storage.getItem("undoneMoves").length !== 0)
    document.querySelector(".redo-btn").disabled = false;
  else document.querySelector(".redo-btn").disabled = true;
  const id = storage
    .getItem("moves")
    .split(" ")
    [+storage.getItem("currentMove")].split(",")[0];
  const cellClass = storage
    .getItem("moves")
    .split(" ")
    [+storage.getItem("currentMove")].split(",")[1];
  if (storage.getItem("moves") !== "") {
    document.querySelector(".undo-btn").disabled = false;
  } else {
    document.querySelector(".undo-btn").disabled = true;
  }
  checkField(id, cellClass);
}

window.addEventListener("storage", function keepUpdated() {
  updateData();
});

window.onload = function loadWindow() {
  if (+storage.getItem("started")) updateData();
  else {
    storage.setItem("started", "1");
    storage.setItem("fieldBlocked", "0");
    storage.setItem("currentPlayer", "1");
    storage.setItem("currentMove", "0");
    storage.setItem("moves", "");
    storage.setItem("undoneMoves", "");
    document.querySelector(".redo-btn").disabled = true;
    document.querySelector(".undo-btn").disabled = true;
  }
};

field.onclick = function fieldClicked(event) {
  if (+storage.getItem("fieldBlocked")) return;
  storage.setItem("started", "1");
  const bool = +storage.getItem("currentPlayer");
  const { target } = event;
  if (target.classList.contains("cell")) {
    document.querySelector(".redo-btn").disabled = true;
    document.querySelector(".undo-btn").disabled = false;
    const id = parseInt(target.getAttribute("data-id"), 10);
    target.classList.add(bool ? "ch" : "r");

    storage.setItem(
      "moves",
      `${storage.getItem("moves")} ${id}${bool ? ",ch" : ",r"}`
    );
    storage.setItem("currentMove", +storage.getItem("currentMove") + 1);
    storage.setItem("undoneMoves", "");

    checkField(id, bool ? "ch" : "r");
    storage.setItem("currentPlayer", bool ? 0 : 1);
  }
};

document.querySelector(".restart-btn").onclick = function restartClicked() {
  storage.setItem("currentMove", "0");
  storage.setItem("moves", "");
  storage.setItem("currentPlayer", "1");
  document.querySelector(".won-title").classList.add("hidden");
  document.querySelector(".won-message").innerHTML = "";
  for (let i = 0; i < listOfCells.length; i += 1) {
    listOfCells[i].className = "";
    listOfCells[i].classList.add("cell");
  }
  storage.setItem("started", "0");
  storage.setItem("fieldBlocked", "0");
};

document.querySelector(".undo-btn").onclick = function undoClicked() {
  document.querySelector(".redo-btn").disabled = false;
  const arrOfMoves = storage.getItem("moves").split(" ");
  unDoMove(arrOfMoves[storage.getItem("currentMove")]);
  storage.setItem("currentMove", +storage.getItem("currentMove") - 1);
  storage.setItem(
    "undoneMoves",
    `${storage.getItem("undoneMoves")} ${arrOfMoves.pop()}`
  );
  storage.setItem("moves", arrOfMoves.join(" "));
  storage.setItem("currentPlayer", +storage.getItem("currentPlayer") ? 0 : 1);
  if (storage.getItem("currentMove") === "0") {
    document.querySelector(".undo-btn").disabled = true;
  }
};

document.querySelector(".redo-btn").onclick = function redoClicked() {
  document.querySelector(".undo-btn").disabled = false;
  storage.setItem("currentPlayer", +storage.getItem("currentPlayer") ? 0 : 1);
  const arrOfUndoneMoves = storage.getItem("undoneMoves").split(" ");
  storage.setItem("currentMove", +storage.getItem("currentMove") + 1);
  storage.setItem(
    "moves",
    `${storage.getItem("moves")} ${
      arrOfUndoneMoves[arrOfUndoneMoves.length - 1]
    }`
  );
  doMove(arrOfUndoneMoves[arrOfUndoneMoves.length - 1]);
  arrOfUndoneMoves.pop();
  storage.setItem("undoneMoves", arrOfUndoneMoves.join(" "));
  if (storage.getItem("undoneMoves").length === 0)
    document.querySelector(".redo-btn").disabled = true;
};
