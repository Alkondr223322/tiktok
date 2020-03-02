let bool = 1;
 field.onclick = function(event){
	let target = event.target;
	// console.log(target);
	// console.log(target.classList);
	// console.log(target.classList.contains('cell'));
	if(target.classList.contains('cell')){
		(bool) ? target.classList.add("ch") : target.classList.add("r");
		bool = !bool;
		getField();
	}
}
function getField(){
	let arrField = [];
	let curid = 0;
	for(let i=0; i<ROWS_COUNT; i++){
		let arrRow = [];
		for(let j=0; j < COLS_COUNT; j++){
			let curCell = document.getElementById(`c-${curid}`);
			console.log(curCell);
			console.log(curid);
			if(curCell.classList.contains('ch')) arrRow[j] = 'x';
			else if(curCell.classList.contains('r')) arrRow[j] = 'o';
			else arrRow[j] = 'e';
			curid++;
			// console.log(arrRow);
		}
		arrField[i] = arrRow;
	}
	// console.log(arrField);
	// console.log(arrField.join());
	findWinner(arrField);
}
function findWinner(arrField){
	let str = '';
	for(let i=0; i<arrField.length; i++){
		checkUp(arrField[i].join(''));
	}
	for (var i = 0; i < arrField[0].length; i++) {
		str='';
		for(let j = 0; j<arrField.length; j++){
			str+=arrField[j][i];
		}
		checkUp(str);
	}
	for(let i=0; i<arrField.length; i++){
		str=''
		if(i+2>arrField.length-1) break;
		for(let j=0; j<arrField[0].length; j++){
			if(j+2<arrField[0].length){
				console.log(1);
				str=arrField[i][j]+arrField[i+1][j+1]+arrField[i+2][j+2];
				checkUp(str);
			}else if(j-2>-1){
				str=arrField[i][j]+arrField[i+1][j-1]+arrField[i+2][j-2];
				checkUp(str);
			}
		}
	}

}
function checkUp(str){
	let regCh = new RegExp(/xxx/g);
	let regR = new RegExp(/ooo/g);
	if(regCh.test(str)){
		declareWinner('x');
	}else if(regR.test(str)){
		declareWinner('o');
	}
}
function declareWinner(winner){
	(winner == 'x') ? alert('Crosses won') : alert('Rounds won');
}