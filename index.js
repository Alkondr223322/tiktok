let fieldobj = document.querySelectorAll('[data-id]');
let storage = localStorage;
//CLEAR EVERYTHING
// storage.setItem('moves', '');
// storage.setItem('move', '0');
// storage.setItem('undoneMoves', '');
window.onload = function(){
	if(storage.getItem('moves')){
		document.querySelector('.undo-btn').disabled = false;
		let arrOfMoves = storage.getItem('moves').split(' ');
		for(let i=1; i<arrOfMoves.length; i++){
			doMove(arrOfMoves[i]);
		}
		if(storage.getItem('undoneMoves').length!=0) document.querySelector('.redo-btn').disabled = false;
	}else{
		storage.setItem('current', '1');
		storage.setItem('move', '0');
		storage.setItem('moves', '');
		storage.setItem('undoneMoves', '');
	}
}
field.onclick = function(event) {
	let bool = +storage.getItem('current');
    let target = event.target;
    if (target.classList.contains('cell')) {
    	document.querySelector('.redo-btn').disabled = true;
    	document.querySelector('.undo-btn').disabled = false;
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
	// console.log(storage.getItem('move'));
	// console.log(arrOfMoves);
	unDoMove(arrOfMoves[storage.getItem('move')]);
	storage.setItem('move', +storage.getItem('move')-1);
	storage.setItem('undoneMoves', storage.getItem('undoneMoves') + ` ${arrOfMoves.pop()}`);
	storage.setItem('moves', arrOfMoves.join(' '));
	// console.log(storage.getItem('moves'));
	// console.log(storage.getItem('undoneMoves'));
	(+storage.getItem('current')) ? storage.setItem('current', 0) :  storage.setItem('current', 1);
	if(storage.getItem('move') == 0){
		document.querySelector('.undo-btn').disabled=true;
	}
}
document.querySelector('.redo-btn').onclick = function(){
	// console.log(storage.getItem('undoneMoves').split(' '));
	// console.log(storage.getItem('moves').split(' '));
	document.querySelector('.undo-btn').disabled=false;
	(+storage.getItem('current')) ? storage.setItem('current', 0) :  storage.setItem('current', 1);
	arrOfUndoneMoves = storage.getItem('undoneMoves').split(' ');
	storage.setItem('move', +storage.getItem('move')+1);
	storage.setItem('moves', storage.getItem('moves') + ` ${arrOfUndoneMoves[arrOfUndoneMoves.length-1]}`);
	doMove(arrOfUndoneMoves[arrOfUndoneMoves.length-1]);
	arrOfUndoneMoves.pop();
	storage.setItem('undoneMoves', arrOfUndoneMoves.join(' '));
	console.log(storage.getItem('move'));
	if(storage.getItem('undoneMoves').length==0) document.querySelector('.redo-btn').disabled = true;
}
function checkField(el, cellClass) {
    let id = parseInt(el.getAttribute('data-id'), 10);
    let win = true;
    let draw = true;
    let winCells = [];
    storage.setItem('moves', storage.getItem('moves')+` ${id},${cellClass}`);
	storage.setItem('move', +storage.getItem('move')+1);
	storage.setItem('undoneMoves', '');
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
    winCells=[]
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
        winCells=[]
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
    winCells=[]
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
    if (draw && document.querySelector('.won-message').innerHTML.length==0) declarewinner('draw', '', '');
}

function declarewinner(cellClass, vector, cells) {
	console.log(cellClass);
	document.querySelector('.redo-btn').disabled = true;
	document.querySelector('.undo-btn').disabled = true;
	document.querySelector('.won-title').classList.remove("hidden");
    if (cellClass == 'draw'){ 
    	document.querySelector('.won-message').innerHTML = 'It\'s a draw!'; 
    	return;}
    document.querySelector('.won-message').innerHTML = (cellClass == 'ch') ? 'Crosses won' : 'Rounds won';
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