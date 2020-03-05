let fieldobj = document.querySelectorAll('[data-id]');
let storage = localStorage;
// storage.setItem('moves', '');
// storage.setItem('move', '0');
window.onload = function(){
	if(storage.getItem('moves')){
		document.querySelector('.undo-btn').disabled = false;
		let arrOfMoves = storage.getItem('moves').split(' ');
		for(let i=1; i<arrOfMoves.length; i++){
			doMove(arrOfMoves[i]);
		}
	}else{
		storage.setItem('current', '1');
		storage.setItem('move', '0');
	}
}
field.onclick = function(event) {
	let bool = +storage.getItem('current');
    let target = event.target;
    if (target.classList.contains('cell')) {
    	document.querySelector('.redo-btn').disabled = true;
    	document.querySelector('.undo-btn').disabled = false;
    			console.log(document.querySelector('.undo-btn'));
        (bool) ? target.classList.add("ch"): target.classList.add("r");
        (bool) ? checkField(target, 'ch'): checkField(target, 'r');
        (bool) ? storage.setItem('current', 0) :  storage.setItem('current', 1);
    }
}
document.querySelector('.restart-btn').onclick = function(){
	storage.setItem('move', '0');
	storage.removeItem('moves');
	storage.setItem('current', 1);	
	document.querySelector('.won-title').classList.add("hidden");
	document.querySelector('.won-message').innerHTML = '';
	for(let i=0; i<fieldobj.length; i++){
		fieldobj[i].className='';
		fieldobj[i].classList.add('cell')
	}
} 
document.querySelector('.undo-btn').onclick = function(){
	document.querySelector('.redo-btn').disabled = false;
	let arrOfMoves = storage.getItem('moves').split(' ');
	console.log(storage.getItem('move'));
	console.log(arrOfMoves);
	unDoMove(arrOfMoves[storage.getItem('move')]);
	storage.setItem('move', +storage.getItem('move')-1);
	arrOfMoves.pop();
	storage.setItem('moves', arrOfMoves.join(' '));
	if(storage.getItem('move') == 0){
		document.querySelector('.undo-btn').disabled=true;
	}
}
document.querySelector('.redo-btn').onclick = function(){

}
function checkField(el, cellClass) {
    let id = parseInt(el.getAttribute('data-id'), 10);
    let win = true;
    let draw = true;
    let winCells = [];
    storage.setItem('moves', storage.getItem('moves')+` ${id},${cellClass}`);
	storage.setItem('move', +storage.getItem('move')+1);
	//CHECK IF DRAW
    for (let i = 0; i < fieldobj.length; i++) {
        if (!fieldobj[i].classList.contains('ch') && !fieldobj[i].classList.contains('r')) draw = false;
    }
    if (draw) declarewinner('draw', '', '');
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
}

function declarewinner(cellClass, vector, cells) {
	document.querySelector('.redo-btn').disabled = true;
	document.querySelector('.undo-btn').disabled = true;
    if (cellClass == 'draw') document.querySelector('.won-message').innerHTML = 'It\'s a draw!';
    document.querySelector('.won-message').innerHTML = (cellClass == 'ch') ? 'Crosses won' : 'Rounds won';
    document.querySelector('.won-title').classList.remove("hidden");
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.add('win');
        cells[i].classList.add(vector);
    }
}
function doMove(move){
	let id = move.split(',')[0];
	let cellClass = move.split(',')[1];
	document.querySelector(`#c-${id}`).classList.add(cellClass);
}
function unDoMove(move){
	let id = move.split(',')[0];
	let cellClass = move.split(',')[1];
	document.querySelector(`#c-${id}`).classList.remove(cellClass);
}