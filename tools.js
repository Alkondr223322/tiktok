/* eslint-disable no-unused-vars */
function declarewinner(cellClass, vector, winnerCells) {
  document.querySelector(".redo-btn").disabled = true;
  document.querySelector(".undo-btn").disabled = true;
  document.querySelector(".won-title").classList.remove("hidden");
  if (cellClass === "draw") {
    document.querySelector(".won-message").innerHTML = "It's a draw!";
    return;
  }
  document.querySelector(".won-message").innerHTML =
    cellClass === "ch" ? "Crosses won" : "Rounds won";
  for (let i = 0; i < winnerCells.length; i += 1) {
    winnerCells[i].classList.add("win");
    winnerCells[i].classList.add(vector);
  }
}

function doMove(move) {
  const id = move.split(",")[0];
  const cellClass = move.split(",")[1];
  document.querySelector(`#c-${id}`).classList.add(cellClass);
}

function unDoMove(move) {
  const id = move.split(",")[0];
  const cellClass = move.split(",")[1];
  document.querySelector(`#c-${id}`).classList.remove(cellClass);
}
