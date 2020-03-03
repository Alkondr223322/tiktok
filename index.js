let bool = 1;
field.onclick = function(event){
	let target = event.target;
	// console.log(target);
	// console.log(target.classList);
	// console.log(target.classList.contains('cell'));
	if(target.classList.contains('cell')){
		(bool) ? target.classList.add("ch") : target.classList.add("r");
		(bool) ? checkField(target, 'ch') : checkField(target, 'r');
		bool = !bool;
	}
}
function checkField(el, cellClass){
	id = parseInt(el.getAttribute('data-id'), 10);
	let fieldobj = document.querySelectorAll('[data-id]');
	// console.log(fieldobj);
	// console.log(fieldobj[id].classList.contains('ch'));
	// console.log(fieldobj[id-COLS_COUNT]);
	// COLUMS 
	if(fieldobj[id-COLS_COUNT*2]){
		if(fieldobj[id-COLS_COUNT].classList.contains(cellClass) && fieldobj[id-COLS_COUNT*2].classList.contains(cellClass)) 
			declarewinner(cellClass, 'vertical', [fieldobj[id], fieldobj[id-COLS_COUNT], fieldobj[id-COLS_COUNT*2]]);
	}
	if(fieldobj[id+COLS_COUNT*2]){
		if(fieldobj[id+COLS_COUNT].classList.contains(cellClass) && fieldobj[id+COLS_COUNT*2].classList.contains(cellClass))
			declarewinner(cellClass, 'vertical', [fieldobj[id], fieldobj[id+COLS_COUNT], fieldobj[id+COLS_COUNT*2]]);
	}
	if(fieldobj[id+COLS_COUNT] && fieldobj[id-COLS_COUNT]){
		if(fieldobj[id-COLS_COUNT].classList.contains(cellClass) && fieldobj[id+COLS_COUNT].classList.contains(cellClass))
			declarewinner(cellClass, 'vertical', [fieldobj[id], fieldobj[id+COLS_COUNT], fieldobj[id-COLS_COUNT]]);
	}
	// ROWS
	if(id%ROWS_COUNT>1){
		if(fieldobj[id-1].classList.contains(cellClass) && fieldobj[id-2].classList.contains(cellClass))
			declarewinner(cellClass, 'horizontal', [fieldobj[id], fieldobj[id-1], fieldobj[id-2]]);
	}
	if(id%ROWS_COUNT<COLS_COUNT-2){
		if(fieldobj[id+1].classList.contains(cellClass) && fieldobj[id+2].classList.contains(cellClass))
			declarewinner(cellClass, 'horizontal', [fieldobj[id], fieldobj[id+1], fieldobj[id+2]]);
	}
	if(id%ROWS_COUNT>0 && id%ROWS_COUNT<COLS_COUNT-1){
		if(fieldobj[id-1].classList.contains(cellClass) && fieldobj[id+1].classList.contains(cellClass))
			declarewinner(cellClass, 'horizontal', [fieldobj[id], fieldobj[id-1], fieldobj[id+1]]);
	}
	//LEFT DIAGONAL
	if(fieldobj[id-COLS_COUNT*2-2]){
		if(fieldobj[id-COLS_COUNT-1].classList.contains(cellClass) && fieldobj[id-COLS_COUNT*2-2].classList.contains(cellClass)) 
			declarewinner(cellClass, 'diagonal-left', [fieldobj[id], fieldobj[id-COLS_COUNT-1], fieldobj[id-COLS_COUNT*2-2]]);
	}
	if(fieldobj[id+COLS_COUNT*2+2]){
		if(fieldobj[id+COLS_COUNT+1].classList.contains(cellClass) && fieldobj[id+COLS_COUNT*2+2].classList.contains(cellClass))
			declarewinner(cellClass, 'diagonal-left', [fieldobj[id], fieldobj[id+COLS_COUNT+1], fieldobj[id+COLS_COUNT*2+2]]);
	}
	if(fieldobj[id-COLS_COUNT-1] && fieldobj[id+COLS_COUNT+1]){
		if(fieldobj[id-COLS_COUNT-1].classList.contains(cellClass) && fieldobj[id+COLS_COUNT+1].classList.contains(cellClass)) 
			declarewinner(cellClass, 'diagonal-left', [fieldobj[id], fieldobj[id-COLS_COUNT-1], fieldobj[id+COLS_COUNT+1]]);
	}
	//RIGHT DIAGONAL
	if(fieldobj[id-COLS_COUNT*2+2]){
		if(fieldobj[id-COLS_COUNT+1].classList.contains(cellClass) && fieldobj[id-COLS_COUNT*2+2].classList.contains(cellClass))
			declarewinner(cellClass, 'diagonal-right', [fieldobj[id], fieldobj[id-COLS_COUNT+1], fieldobj[id-COLS_COUNT*2+2]]);
	}
	if(fieldobj[id+COLS_COUNT*2-2]){
		if(fieldobj[id+COLS_COUNT-1].classList.contains(cellClass) && fieldobj[id+COLS_COUNT*2-2].classList.contains(cellClass))
			declarewinner(cellClass, 'diagonal-right', [fieldobj[id], fieldobj[id+COLS_COUNT-1], fieldobj[id+COLS_COUNT*2-2]]);
	}
	if(fieldobj[id-COLS_COUNT+1] && fieldobj[id+COLS_COUNT-1]){
		if(fieldobj[id-COLS_COUNT+1].classList.contains(cellClass) && fieldobj[id+COLS_COUNT-1].classList.contains(cellClass)) 
			declarewinner(cellClass, 'diagonal-right', [fieldobj[id], fieldobj[id-COLS_COUNT+1], fieldobj[id+COLS_COUNT-1]]);
	}
	//CHECK IF DRAW
	let draw = true;
	for(let i=0; i<fieldobj.length; i++){
		if(!fieldobj[i].classList.contains('ch') && !fieldobj[i].classList.contains('r')) draw=false;
	}
	if(draw && document.querySelector('.won-message').innerHTML.length==0) declarewinner('draw', '', '');
}
function declarewinner(cellClass, vector, cells){
	if(cellClass=='draw') document.querySelector('.won-message').innerHTML = 'It\'s a draw!';
	document.querySelector('.won-message').innerHTML = (cellClass == 'ch') ? 'Crosses won' : 'Rounds won';
	document.querySelector('.won-title').classList.remove("hidden");
	for(let i=0; i<cells.length; i++){
		cells[i].classList.add(vector);
		console.log(cells[i])
	}
}