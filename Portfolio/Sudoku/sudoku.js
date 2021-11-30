/* variables */
var cells = new Array(81);
var currentCell = 0;
var difficulty = 0;

/* functions */

function c(c) {
  console.log(c);
}

function askDifficulty() {
  difficulty = 35;
  //beginner 45
  //easy 40
  //med 35
  //hard 30
  //expert 25
  //HERE ask difficulty
  //adjust difficulty to rules
  setCells();
}

//generate number board
function setCells() {
  var attemptedNumbers = new Array(81);
  for (i = 0; i < 81; i++) {
    attemptedNumbers[i] = [0];
  }
  while (currentCell > -1 && currentCell < 81) {
    var number = 0;
    var invalid = true;
    /* set current cell */
    while (invalid && attemptedNumbers[currentCell].length < 10) {
      number = Math.floor(Math.random()*9+1);
      if (!attemptedNumbers[currentCell].includes(number)) {
        attemptedNumbers[currentCell].push(number);
        if (!isInVertical(currentCell, number) && !isInHorizonal(currentCell, number) && !isInBox(currentCell, number)) {
          if (variantValid(currentCell, number)) {
            invalid = false;
          }
        }
      }
    }
    /* previous cell */
    if (invalid) {
      attemptedNumbers[currentCell] = [0];
      cells[currentCell] = 0;
      currentCell--;
    }
    /* next cell */
    else {
      cells[currentCell] = number;
      currentCell++;
    }
  }
  //start or end game
  if (currentCell==-1) {
    fail();
  } else {
    displayCells();
  }
}

//search for the same number in the same column
function isInVertical(currentCell, number) {
  var result = false;
  for (i = currentCell-9; i > -1; i -= 9) {
    if (cells[i] == number) {
      result = true;
    }
  }
  return result;
}

//search for the same number in the same row
function isInHorizonal(currentCell, number) {
  var result = false;
  var rowStart = Math.floor(currentCell/9)*9;
  for (i = rowStart; i < rowStart+9; i++) {
    if (cells[i] == number) {
      result = true;
    }
  }
  return result;
}

//search for the same number in the same 3x3
function isInBox(currentCell, number) {
  var result = false;
  var stop = currentCell;
  var adjust = 0;
  var temp = currentCell / 3 +" ";
  /* find horizontal stop */
  if (temp.includes(".6")) {
    adjust = -2;
  } else if (temp.includes(".3")) {
    adjust = -1;
  }
  /* find vertical stop */
  temp = currentCell;
  while (temp > 26) {
    temp -= 27;
  }
  temp = Math.floor(temp/9)*9;
  stop = currentCell + adjust - temp;
  /* isIn box */
  for (i = currentCell + adjust; i >= stop; i -= 9) {
    if (cells[i] == number || cells[i+1] == number || cells[i+2] == number) {
      result = true;
    }
  }
  return result;
}

function variantValid(cell, number) {
  //HERE
  return true;
}

function fail() {
  alert("No possible games! Try removing some variants.");
}

function displayCells() {
  /* unsolve */
  var display = new Array();
  cells.forEach(cell => display.push(cell));
  var tested = new Array([0]);
  var stop = 81 - Math.floor(Math.random()*5+difficulty);
  while (stop > 0 && tested.length < 81) {
    var cell = Math.floor(Math.random()*81);
    if (!tested.includes(cell)) {
      tested.push(cell);
      //if solvable
      if (isDefaultNumber(cell) || isDefaultCell(cell)) {
        display[cell] = 0;
        stop--;
      }
    }
  }
  /* display cells */
  for (i = 0; i < 81; i++) {
    if (display[i] > 0) {
      document.getElementById("c"+i).innerHTML = "<strong>"+display[i]+"</strong>";
    }
  }
}

//is this number the only option for this cell?
function isDefaultNumber(cell) {
  var result = false;
  //HERE HERE
  //isIn all numbers on hard and up
  return result;
}

//is this cell the only option for this number?
function isDefaultCell(cell) {
  var result = false;
  var otherNumbers = new Array();
  for (i=1;i<10;i++){
    if(i != cells[cell]){
      if(isInVertical(cell, i) || isInHorizonal(cell, i) || isInBox(cell, i)){
        otherNumbers.push(i);
      }
    }
  }
  if (otherNumbers.length == 8){
    result = true;
  }
  return result;
}