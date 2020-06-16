/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./generateField.js":
/*!**************************!*\
  !*** ./generateField.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const ROWS_COUNT = 3;\nconst COLS_COUNT = 3;\nconst field = document.querySelector(\".field\");\n\nfunction generateCols(row, colsCount, rowId) {\n  for (let i = 0; i < colsCount; i++) {\n    const id = rowId * COLS_COUNT + i;\n    const col = document.createElement(\"div\");\n    col.id = `c-${id}`;\n    col.dataset.id = id;\n    col.className = \"cell\";\n    row.appendChild(col);\n  }\n}\n\nfunction generateRows(rowsCount, colsCount) {\n  for (let i = 0; i < rowsCount; i++) {\n    const row = document.createElement(\"div\");\n    row.className = \"row\";\n    generateCols(row, colsCount, i);\n    field.appendChild(row);\n  }\n}\n\ngenerateRows(ROWS_COUNT, COLS_COUNT);\n\n\n//# sourceURL=webpack:///./generateField.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const tools = __webpack_require__(/*! @gvan-iovnov/mytools */ \"./node_modules/@gvan-iovnov/mytools/tools.js\");\n\nconst listOfCells = document.querySelectorAll(\"[data-id]\");\nconst storage = localStorage;\nconst ROWS_COUNT1 = 3;\nconst COLS_COUNT1 = 3;\nconst field1 = document.querySelector(\".field\");\n// CLEAR EVERYTHING\n// storage.setItem('moves', '');\n// storage.setItem('move', '0');\n// storage.setItem('undoneMoves', '');\n\nfunction checkField(id, cellClass) {\n  let win = true;\n  let draw = true;\n  let winCells = [];\n  // COLUMN\n  const col = id % ROWS_COUNT1;\n  for (let i = col; i < listOfCells.length; i += COLS_COUNT1) {\n    if (!listOfCells[i].classList.contains(cellClass)) win = false;\n  }\n  if (win) {\n    for (let i = col; i < listOfCells.length; i += COLS_COUNT1) {\n      winCells.push(listOfCells[i]);\n    }\n    tools.declareWinner(cellClass, \"vertical\", winCells);\n    storage.setItem(\"fieldBlocked\", \"1\");\n    return;\n  }\n  // ROWS\n  win = true;\n  winCells = [];\n  const row = Math.floor(id / COLS_COUNT1);\n  for (let i = 0; i < COLS_COUNT1; i += 1) {\n    if (!listOfCells[i + ROWS_COUNT1 * row].classList.contains(cellClass))\n      win = false;\n  }\n  if (win) {\n    for (let i = 0; i < COLS_COUNT1; i += 1) {\n      winCells.push(listOfCells[i + ROWS_COUNT1 * row]);\n    }\n    tools.declareWinner(cellClass, \"horizontal\", winCells);\n    storage.setItem(\"fieldBlocked\", \"1\");\n    return;\n  }\n  // RIGHT DIAGONAL\n  if (row === col) {\n    win = true;\n    winCells = [];\n    for (let i = 0; i < listOfCells.length; i += COLS_COUNT1 + 1) {\n      if (!listOfCells[i].classList.contains(cellClass)) win = false;\n    }\n    if (win) {\n      for (let i = 0; i < listOfCells.length; i += COLS_COUNT1 + 1) {\n        winCells.push(listOfCells[i]);\n      }\n      tools.declareWinner(cellClass, \"diagonal-right\", winCells);\n      storage.setItem(\"fieldBlocked\", \"1\");\n      return;\n    }\n  }\n  // LEFT DIAGONAL\n  win = true;\n  winCells = [];\n  for (\n    let i = COLS_COUNT1 - 1;\n    i < listOfCells.length - COLS_COUNT1 + 1;\n    i += COLS_COUNT1 - 1\n  ) {\n    if (!listOfCells[i].classList.contains(cellClass)) win = false;\n  }\n  if (win) {\n    for (\n      let i = COLS_COUNT1 - 1;\n      i < listOfCells.length - COLS_COUNT1 + 1;\n      i += COLS_COUNT1 - 1\n    ) {\n      winCells.push(listOfCells[i]);\n    }\n    tools.declareWinner(cellClass, \"diagonal-left\", winCells);\n    storage.setItem(\"fieldBlocked\", \"1\");\n    return;\n  }\n  // CHECK IF DRAW\n  for (let i = 0; i < listOfCells.length; i += 1) {\n    if (\n      !listOfCells[i].classList.contains(\"ch\") &&\n      !listOfCells[i].classList.contains(\"r\")\n    )\n      draw = false;\n  }\n  if (draw && document.querySelector(\".won-message\").innerHTML.length === 0) {\n    tools.declareWinner(\"draw\", \"\", \"\");\n    storage.setItem(\"fieldBlocked\", \"1\");\n  }\n}\n\nfunction updateData() {\n  document.querySelector(\".won-title\").classList.add(\"hidden\");\n  document.querySelector(\".won-message\").innerHTML = \"\";\n  for (let i = 0; i < listOfCells.length; i += 1) {\n    listOfCells[i].className = \"\";\n    listOfCells[i].classList.add(\"cell\");\n  }\n  const arrOfMoves = storage.getItem(\"moves\").split(\" \");\n  for (let i = 1; i < arrOfMoves.length; i += 1) {\n    tools.doMove(arrOfMoves[i]);\n  }\n  if (storage.getItem(\"undoneMoves\").length !== 0)\n    document.querySelector(\".redo-btn\").disabled = false;\n  else document.querySelector(\".redo-btn\").disabled = true;\n  const id = storage\n    .getItem(\"moves\")\n    .split(\" \")\n    [+storage.getItem(\"currentMove\")].split(\",\")[0];\n  const cellClass = storage\n    .getItem(\"moves\")\n    .split(\" \")\n    [+storage.getItem(\"currentMove\")].split(\",\")[1];\n  if (storage.getItem(\"moves\") !== \"\") {\n    document.querySelector(\".undo-btn\").disabled = false;\n  } else {\n    document.querySelector(\".undo-btn\").disabled = true;\n  }\n  checkField(id, cellClass);\n}\n\nwindow.addEventListener(\"storage\", function keepUpdated() {\n  updateData();\n});\n\nwindow.onload = function loadWindow() {\n  if (+storage.getItem(\"started\")) updateData();\n  else {\n    storage.setItem(\"started\", \"1\");\n    storage.setItem(\"fieldBlocked\", \"0\");\n    storage.setItem(\"currentPlayer\", \"1\");\n    storage.setItem(\"currentMove\", \"0\");\n    storage.setItem(\"moves\", \"\");\n    storage.setItem(\"undoneMoves\", \"\");\n    document.querySelector(\".redo-btn\").disabled = true;\n    document.querySelector(\".undo-btn\").disabled = true;\n  }\n};\n\nfield1.onclick = function fieldClicked(event) {\n  if (+storage.getItem(\"fieldBlocked\")) return;\n  storage.setItem(\"started\", \"1\");\n  const bool = +storage.getItem(\"currentPlayer\");\n  const { target } = event;\n  if (target.classList.contains(\"cell\")) {\n    document.querySelector(\".redo-btn\").disabled = true;\n    document.querySelector(\".undo-btn\").disabled = false;\n    const id = parseInt(target.getAttribute(\"data-id\"), 10);\n    target.classList.add(bool ? \"ch\" : \"r\");\n\n    storage.setItem(\n      \"moves\",\n      `${storage.getItem(\"moves\")} ${id}${bool ? \",ch\" : \",r\"}`\n    );\n    storage.setItem(\"currentMove\", +storage.getItem(\"currentMove\") + 1);\n    storage.setItem(\"undoneMoves\", \"\");\n\n    checkField(id, bool ? \"ch\" : \"r\");\n    storage.setItem(\"currentPlayer\", bool ? 0 : 1);\n  }\n};\n\ndocument.querySelector(\".restart-btn\").onclick = function restartClicked() {\n  storage.setItem(\"currentMove\", \"0\");\n  storage.setItem(\"moves\", \"\");\n  storage.setItem(\"currentPlayer\", \"1\");\n  document.querySelector(\".won-title\").classList.add(\"hidden\");\n  document.querySelector(\".won-message\").innerHTML = \"\";\n  for (let i = 0; i < listOfCells.length; i += 1) {\n    listOfCells[i].className = \"\";\n    listOfCells[i].classList.add(\"cell\");\n  }\n  storage.setItem(\"started\", \"0\");\n  storage.setItem(\"fieldBlocked\", \"0\");\n};\n\ndocument.querySelector(\".undo-btn\").onclick = function undoClicked() {\n  document.querySelector(\".redo-btn\").disabled = false;\n  const arrOfMoves = storage.getItem(\"moves\").split(\" \");\n  tools.unDoMove(arrOfMoves[storage.getItem(\"currentMove\")]);\n  storage.setItem(\"currentMove\", +storage.getItem(\"currentMove\") - 1);\n  storage.setItem(\n    \"undoneMoves\",\n    `${storage.getItem(\"undoneMoves\")} ${arrOfMoves.pop()}`\n  );\n  storage.setItem(\"moves\", arrOfMoves.join(\" \"));\n  storage.setItem(\"currentPlayer\", +storage.getItem(\"currentPlayer\") ? 0 : 1);\n  if (storage.getItem(\"currentMove\") === \"0\") {\n    document.querySelector(\".undo-btn\").disabled = true;\n  }\n};\n\ndocument.querySelector(\".redo-btn\").onclick = function redoClicked() {\n  document.querySelector(\".undo-btn\").disabled = false;\n  storage.setItem(\"currentPlayer\", +storage.getItem(\"currentPlayer\") ? 0 : 1);\n  const arrOfUndoneMoves = storage.getItem(\"undoneMoves\").split(\" \");\n  storage.setItem(\"currentMove\", +storage.getItem(\"currentMove\") + 1);\n  storage.setItem(\n    \"moves\",\n    `${storage.getItem(\"moves\")} ${\n      arrOfUndoneMoves[arrOfUndoneMoves.length - 1]\n    }`\n  );\n  tools.doMove(arrOfUndoneMoves[arrOfUndoneMoves.length - 1]);\n  arrOfUndoneMoves.pop();\n  storage.setItem(\"undoneMoves\", arrOfUndoneMoves.join(\" \"));\n  if (storage.getItem(\"undoneMoves\").length === 0)\n    document.querySelector(\".redo-btn\").disabled = true;\n};\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/@gvan-iovnov/mytools/tools.js":
/*!****************************************************!*\
  !*** ./node_modules/@gvan-iovnov/mytools/tools.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* eslint-disable no-unused-vars */\nexports.declareWinner = function declareWinner(cellClass, vector, winnerCells) {\n  document.querySelector(\".redo-btn\").disabled = true;\n  document.querySelector(\".undo-btn\").disabled = true;\n  document.querySelector(\".won-title\").classList.remove(\"hidden\");\n  if (cellClass === \"draw\") {\n    document.querySelector(\".won-message\").innerHTML = \"It's a draw!\";\n    return;\n  }\n  document.querySelector(\".won-message\").innerHTML =\n    cellClass === \"ch\" ? \"Crosses won\" : \"Rounds won\";\n  for (let i = 0; i < winnerCells.length; i += 1) {\n    winnerCells[i].classList.add(\"win\");\n    winnerCells[i].classList.add(vector);\n  }\n};\n\nexports.doMove = function doMove(move) {\n  const id = move.split(\",\")[0];\n  const cellClass = move.split(\",\")[1];\n  document.querySelector(`#c-${id}`).classList.add(cellClass);\n};\n\nexports.unDoMove = function unDoMove(move) {\n  const id = move.split(\",\")[0];\n  const cellClass = move.split(\",\")[1];\n  document.querySelector(`#c-${id}`).classList.remove(cellClass);\n};\n\n\n//# sourceURL=webpack:///./node_modules/@gvan-iovnov/mytools/tools.js?");

/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi ./generateField.js ./index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./generateField.js */\"./generateField.js\");\nmodule.exports = __webpack_require__(/*! ./index.js */\"./index.js\");\n\n\n//# sourceURL=webpack:///multi_./generateField.js_./index.js?");

/***/ })

/******/ });