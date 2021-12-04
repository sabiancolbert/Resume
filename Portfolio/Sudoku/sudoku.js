/* variables */
var cells = new Array(81);
var display = new Array();
var userCells = new Array();
var moveList = new Array();
var numberTotals = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var currentCell = 0;
var currentMove = 0;
var difficulty = 35;
var noteMode = 0;
var noteModeList = new Array(81);

/* game creation */

function c(c) {
  console.log(c);
}

function askDifficulty() {
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
      display[currentCell] = 0;
      currentCell--;
    }
    /* next cell */
    else {
      cells[currentCell] = number;
      display[currentCell] = number;
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
function isInVertical(cell, number) {
  var result = false;
  for (i = cell-9; i > -1; i -= 9) {
    if (display[i] == number) {
      result = true;
    }
  }
  for (i = cell+9; i < 81; i += 9) {
    if (display[i] == number) {
      result = true;
    }
  }
  return result;
}

//search for the same number in the same row
function isInHorizonal(cell, number) {
  var result = false;
  var rowStart = Math.floor(cell/9)*9;
  for (i = rowStart; i < rowStart+9; i++) {
    if (display[i] == number) {
      result = true;
    }
  }
  return result;
}

//search for the same number in the same 3x3
function isInBox(cell, number) {
  var result = false;
  /* find stopping cell */
  var adjust = 0;
  var temp = cell / 3 +" ";
  if (temp.includes(".6")) {
    adjust = -2;
  } else if (temp.includes(".3")) {
    adjust = -1;
  }
  temp = cell;
  while (temp > 26) {
    temp -= 27;
  }
  temp = Math.floor(temp/9)*9;
  var stop = cell + adjust - temp;
  /* test box */
  for (i = stop + 18; i >= stop; i -= 9) {
    if (display[i] == number || display[i+1] == number || display[i+2] == number) {
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
  var tested = new Array([0]);
  var stop = 81 - Math.floor(Math.random()*5+difficulty);
  while (stop > 0 && tested.length < 81) {
    var cell = Math.floor(Math.random()*81);
    if (!tested.includes(cell)) {
      tested.push(cell);
      //if solvable
      if (isDefaultNumber(cell) || isDefaultCell(cell)) {
        numberTotals[display[cell]-1]++;
        display[cell] = 0;
        userCells.push(cell);
        stop--;
      }
    }
  }
  /* display cells */
  for (i = 0; i < 81; i++) {
    if (display[i] > 0) {
      document.getElementById("c"+i).innerHTML = "<bold>"+display[i]+"</strong>";
    }
  }
    for (i = 0; i < 81; i++) {
    noteModeList[i] = 0;
  }
}

//is this number the only option for this cell?
function isDefaultNumber(cell) {
  var result = false;
  var otherNumbers = new Array();
  for (x = 1; x < 10; x++) {
    if (x != display[cell]) {
      if (isInVertical(cell, x) || isInHorizonal(cell, x) || isInBox(cell, x)) {
        otherNumbers.push(x);
      }
    }
  }
  if (otherNumbers.length == 8) {
    result = true;
  }
  return result;
}

//is this cell the only option for this number?
function isDefaultCell(cell) {
  var result = true;
  var emptyCells = new Array();
  //find empty cells in row
  var temp = Math.floor(cell/9)*9;
  for (i = temp; i < temp+9; i++) {
    if (display[i] == 0) {
      emptyCells.push(i);
    }
  }
  //find empty cells in column
  for (i = cell-9; i > -1; i -= 9) {
    if (display[i] == 0) {
      emptyCells.push(i);
    }
  }
  for (i = cell+9; i < 81; i += 9) {
    if (display[i] == 0) {
      emptyCells.push(i);
    }
  }
  //find box
  var adjust = 0;
  temp = cell / 3 +" ";
  if (temp.includes(".6")) {
    adjust = -2;
  } else if (temp.includes(".3")) {
    adjust = -1;
  }
  temp = cell;
  while (temp > 26) {
    temp -= 27;
  }
  temp = Math.floor(temp/9)*9;
  var start = cell + adjust - temp;
  //find empty cells in box
  display[cell]=-1;
  if (display[start] == 0) {
    emptyCells.push(start);
  }
  if (display[start + 1] == 0) {
    emptyCells.push(start +1);
  }
  if (display[start +2] == 0) {
    emptyCells.push(start+2);
  }
  if (display[start+9] == 0) {
    emptyCells.push(start+9);
  }
  if (display[start+10] == 0) {
    emptyCells.push(start+10);
  }
  if (display[start+11] == 0) {
    emptyCells.push(start+11);
  }
  if (display[start+18] == 0) {
    emptyCells.push(start+18);
  }
  if (display[start+19] == 0) {
    emptyCells.push(start+19);
  }
  if (display[start+20] == 0) {
    emptyCells.push(start+20);
  }
  display[cell] = cells[cell];
  //test empty cells
  emptyCells.forEach(option => {
    if (result && !isInVertical(option, display[cell]) && !isInHorizonal(option, display[cell])) {
      result = false;
    }
  });
  return result;
}

/* gameplay */

function set(cellId) {
  var cellNumber = id.substring(1,id.length) * 1;
  var selection = document.getElementById("selection");
  var numberLabel = document.getElementById("numberLabel");
  //if not in note mode 3
  if (note != 2) {
    //if not same number
    //HERE if not same number
    if (display[cellNumber] != selection.innerHTML) {
      //if old is not empty
      if (cellId.innerHTML +1 != 1) {
        //update old number total
        numberTotals[cellId.innerHTML - 1]++;
      }
      //update cell
      cellId.innerHTML = selection.innerHTML;
      //if new is not empty
      if (cellId.innerHTML +1 != 1) {
        //update new number total
        numberTotals[cellId.innerHTML - 1]--;
        //display new number total
        numberLabel.innerHTML = numberTotals[cellId.innerHTML -1];
      } else {
        //clear number label
        numberLabel.innerHTML = "";
      }
      //update display array
      display[cellNumber] = selection.innerHTML
      //update move list
      //moveList[currentMove] =
      //for (i = currentMove+1; i <
      currentMove++;
    }
    /* if same number */
    else{
      
    }
  } 
  else {
    //here note mode
  }
}

function select(number) {
  document.getElementById("selection").innerHTML = number;
  if (number != 0) {
    document.getElementById("numberLabel").innerHTML = numberTotals[number-1];
  } else {
    document.getElementById("numberLabel").innerHTML = "";
  }
}

function undo() {}

function redo() {}

function note() {
  noteMode++;
  if (noteMode == 3) {
    noteMode = 0;
  }
  //HERE set style of selection
}
/*//HERE
   HTML
add little text under the numbers to show how many are left like: 2/9






   JAVASCRIPT
make numberLabel go down instead of up
highlight on grid all instances of the selected number; note=1 highlights, note =2 does not
highlight selected number/eraser
click on selected number/eraser to change #selected to blank, switching to grid cell selection mode (press 1 first, then number)
some games end with two posibilities;test for criss crossed pairs, plug one answer in if so

change all cells function calls to ## instead of c## and fix the JavaScript for it
condense set using variables for readability and remove notes after


*/