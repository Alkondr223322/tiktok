let fieldobj = document.querySelectorAll('[data-id]');
let storage = localStorage;
let move=0;	
// storage.setItem('moves', '');
window.onload = function(){
	if(storage.getItem('moves')){
		let arrOfMoves = storage.getItem('moves').split(' ');
		for(let i=1; i<arrOfMoves.length; i++){
			let arr = arrOfMoves[i].split(',');
			doMove(arr[0], arr[1])
		}
	}else{
		storage.setItem('current', '1');
	}
}
field.onclick = function(event) {
	let bool = +storage.getItem('current');
    let target = event.target;
    if (target.classList.contains('cell')) {
        (bool) ? target.classList.add("ch"): target.classList.add("r");
        (bool) ? checkField(target, 'ch'): checkField(target, 'r');
        (bool) ? storage.setItem('current', 0) :  storage.setItem('current', 1);
    }
}
document.querySelector('.restart-btn').onclick = function(){
	storage.removeItem('moves');
	storage.setItem('current', 1);	
	document.querySelector('.won-title').classList.add("hidden");
	document.querySelector('.won-message').innerHTML = '';
	for(let i=0; i<fieldobj.length; i++){
		fieldobj[i].className='';
		fieldobj[i].classList.add('cell')
	}
} 
function checkField(el, cellClass) {
    let id = parseInt(el.getAttribute('data-id'), 10);
    let win = true;
    let draw = true;
    let winCells = [];
    storage.setItem('moves', storage.getItem('moves')+` ${id},${cellClass}`);
	move++;
	console.log(storage.getItem('moves').split(' '));
    // console.log(fieldobj);
    // console.log(fieldobj[id].classList.contains('ch'));
    // console.log(fieldobj[id-COLS_COUNT]);
    // COLUMN
    let col = id % ROWS_COUNT;
    for (let i = col; i < fieldobj.length; i += COLS_COUNT) {
        if (!fieldobj[i].classList.contains(cellClass)) win = false
    }
    if (win) {
        for (let i = col; i < fieldobj.length; i += COLS_COUNT) {
            winCells.push(fieldobj[i]);
        }
        declarewinner(cellClass, 'vertical', winCells);
    }
    // ROWS
    win = true;
    let row = Math.floor(id / COLS_COUNT);
    for (let i = 0; i < COLS_COUNT; i++) {
        if (!fieldobj[i + ROWS_COUNT * row].classList.contains(cellClass)) win = false;
    }
    if (win) {
        for (let i = 0; i < COLS_COUNT; i++) {
            winCells.push(fieldobj[i + ROWS_COUNT * row]);
        }
        declarewinner(cellClass, 'horizontal', winCells);
    }
    //RIGHT DIAGONAL
    if (row == col) {
        win = true;
        for (let i = 0; i < fieldobj.length; i += COLS_COUNT + 1) {
            if (!fieldobj[i].classList.contains(cellClass)) win = false;
        }
        if (win) {
            for (let i = 0; i < fieldobj.length; i += COLS_COUNT + 1) {
                winCells.push(fieldobj[i]);
            }
            declarewinner(cellClass, 'diagonal-right', winCells);
        }
    }
    //LEFT DIAGONAL
    win=true;
    for(let i = COLS_COUNT-1; i < fieldobj.length-COLS_COUNT+1; i+=COLS_COUNT-1){
    	if (!fieldobj[i].classList.contains(cellClass)) win = false;
    }
    if (win){
    	for (let i = COLS_COUNT-1; i < fieldobj.length-COLS_COUNT+1; i+=COLS_COUNT-1) {
                winCells.push(fieldobj[i]);
            }
        declarewinner(cellClass, 'diagonal-left', winCells);
    }
    //CHECK IF DRAW
    for (let i = 0; i < fieldobj.length; i++) {
        if (!fieldobj[i].classList.contains('ch') && !fieldobj[i].classList.contains('r')) draw = false;
    }
    if (draw && document.querySelector('.won-message').innerHTML.length == 0) declarewinner('draw', '', '');
}

function declarewinner(cellClass, vector, cells) {
    if (cellClass == 'draw') document.querySelector('.won-message').innerHTML = 'It\'s a draw!';
    document.querySelector('.won-message').innerHTML = (cellClass == 'ch') ? 'Crosses won' : 'Rounds won';
    document.querySelector('.won-title').classList.remove("hidden");
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.add('win');
        cells[i].classList.add(vector);
    }
}
function doMove(id, cellClass){
	document.querySelector(`#c-${id}`).classList.add(cellClass);
}
function unDoMove(id, cellClass){
	document.querySelector(`#c-${id}`).classList.remove(cellClass);
}