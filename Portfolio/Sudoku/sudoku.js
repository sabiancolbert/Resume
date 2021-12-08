/* variables */
var cells = new Array(81);
var displayCells = new Array();
var userCells = new Array();
var moveList = new Array();
var numberTotals = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var currentCell = 0;
var currentMove = 0;
var difficulty = 40;
var noteMode = 0;
var noteModeCells = new Array(81);

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
      displayCells[currentCell] = 0;
      currentCell--;
    }
    /* next cell */
    else {
      cells[currentCell] = number;
      displayCells[currentCell] = number;
      currentCell++;
    }
  }
  //start or end game
  if (currentCell==-1) {
    fail();
  } else {
    displayCellsCells();
  }
}

//search for the same number in the same column
function isInVertical(cell, number) {
  var result = false;
  for (i = cell-9; i > -1; i -= 9) {
    if (displayCells[i] == number) {
      result = true;
    }
  }
  for (i = cell+9; i < 81; i += 9) {
    if (displayCells[i] == number) {
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
    if (displayCells[i] == number) {
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
    if (displayCells[i] == number || displayCells[i+1] == number || displayCells[i+2] == number) {
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

function displayCellsCells() {
  /* unsolve */
  var tested = new Array([0]);
  var stop = 81 - Math.floor(Math.random()*5+difficulty);
  while (stop > 0 && tested.length < 81) {
    var cell = Math.floor(Math.random()*81);
    if (!tested.includes(cell)) {
      tested.push(cell);
      //if solvable
      if (isDefaultNumber(cell) || isDefaultCell(cell)) {
        numberTotals[displayCells[cell]-1]++;
        displayCells[cell] = 0;
        userCells.push(cell);
        stop--;
      }
    }
  }
  //HERE dont do whats under me. criss cross shouldnt be happening so fix that instead
  //HERE if there are unsolvable criss crossed cells, plug one corner in here
  /* displayCells cells */
  for (i = 0; i < 81; i++) {
    if (displayCells[i] > 0) {
      document.getElementById("c"+i).innerHTML = "<bold>"+displayCells[i]+"</strong>";
    }
  }
  for (i = 0; i < 81; i++) {
    noteModeCells[i] = 0;
  }
  select(1);
}

//is this number the only option for this cell?
function isDefaultNumber(cell) {
  var result = false;
  var otherNumbers = new Array();
  for (x = 1; x < 10; x++) {
    if (x != displayCells[cell]) {
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
    if (displayCells[i] == 0) {
      emptyCells.push(i);
    }
  }
  //find empty cells in column
  for (i = cell-9; i > -1; i -= 9) {
    if (displayCells[i] == 0) {
      emptyCells.push(i);
    }
  }
  for (i = cell+9; i < 81; i += 9) {
    if (displayCells[i] == 0) {
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
  displayCells[cell]=-1;
  if (displayCells[start] == 0) {
    emptyCells.push(start);
  }
  if (displayCells[start + 1] == 0) {
    emptyCells.push(start +1);
  }
  if (displayCells[start +2] == 0) {
    emptyCells.push(start+2);
  }
  if (displayCells[start+9] == 0) {
    emptyCells.push(start+9);
  }
  if (displayCells[start+10] == 0) {
    emptyCells.push(start+10);
  }
  if (displayCells[start+11] == 0) {
    emptyCells.push(start+11);
  }
  if (displayCells[start+18] == 0) {
    emptyCells.push(start+18);
  }
  if (displayCells[start+19] == 0) {
    emptyCells.push(start+19);
  }
  if (displayCells[start+20] == 0) {
    emptyCells.push(start+20);
  }
  displayCells[cell] = cells[cell];
  //test empty cells
  emptyCells.forEach(option => {
    if (result && !isInVertical(option, displayCells[cell]) && !isInHorizonal(option, displayCells[cell])) {
      result = false;
    }
  });
  return result;
}

/* gameplay */

function set(id) {
  var cellElement = document.getElementById(id);
  var cellNumber = id.substring(1,id.length) * 1;
  var selectionElement = document.getElementById("selectionElement");
  var counterElement = document.getElementById("counterElement");
  /* set cellElement */
  if (userCells.includes(cellNumber)) {
    /* number mode (black or grey) */
    if (noteMode != 2) {
      //if different number or different note mode
      if (displayCells[cellNumber] != selectionElement.innerHTML || noteMode != noteModeCells[cellNumber]) {
        //clear notes and add to move list for undo
        //HERE
        //if old is not empty
        if (cellElement.innerHTML +1 != 1) {
          //update old number total
          numberTotals[cellElement.innerHTML - 1]++;
        }
        //update cell
        cellElement.innerText = selectionElement.innerText;
        //if new is not empty
        if (cellElement.innerHTML +1 != 1) {
          //update new number total
          numberTotals[cellElement.innerHTML - 1]--;
          //displayCells new number total
          counterElement.innerHTML = numberTotals[cellElement.innerHTML -1];
        } else {
          //clear number label
          if (selectionElement.innerHTML = " ") {
            counterElement.innerHTML = "Erase";
          } else {
            counterElement.innerHTML = "";
          }
        }
        //update displayCells array
        displayCells[cellNumber] = selectionElement.innerHTML
        //update move list
        //moveList[currentMove] =
        //for (i = currentMove+1; i <
        currentMove++;
        //seperate note mode 1 and 2
        if (noteMode == 1) {

          cellElement.style.color = "#777777";
          //smaller font size
          //update cells notemode
          noteModeCells[cellNumber] = 1;
        } else {
          //check();
          cellElement.style.color = "black";

          //update cells notemode
          noteModeCells[cellNumber] = 0;
          //same font size
          /* auto remove notes */
          //HERE
        }
      }

      /* highlight */
      //HERE
    }
    /* note mode */
    else {
      cellElement.style.color = "black";
      var string = "<div class='notesholder'><article id='n1"+cellNumber+"'>1</article><article id='n2"+cellNumber+"'>2</article><article id='n3"+cellNumber+"'>3</article><article id='n4"+cellNumber+"'>4</article><article id='n5"+cellNumber+"'>5</article><article id='n6"+cellNumber+"'>6</article><article id='n7"+cellNumber+"'>7</article><article id='n8"+cellNumber+"'>8</article><article id='n9"+cellNumber+"'>9</article></div>";
      cellElement.innerHTML = string;
      document.getElementById("n1"+cellNumber).style = "top:0;displayCells: inline-block;font-size: 50%;position: absolute;max-height: 33.33%;width: 33.33%;font-weight: 600;";
      c(document.getElementById("n1"+cellNumber));
      noteModeCells[cellNumber] = 2;
      displayCells[cellNumber]=-1;
      //same font size
      //HERE
    }
  }
}

function select(number) {
  //dont clear highlight, for visually easier erasing
  if (number != 0) {
    document.getElementById("counterElement").innerHTML = numberTotals[number-1];
    document.getElementById("selectionElement").innerHTML = number;
      //HERE change highlight
  } else {
    document.getElementById("selectionElement").innerHTML = " ";
    document.getElementById("counterElement").innerHTML = "Erase";
  }
}

function undo() {}

function redo() {}

function note() {
  noteMode++;
  if (noteMode == 3) {
    noteMode = 0;
    document.getElementById("selectionElement").style.fontSize = "300%";
  } else if (noteMode == 1) {
    document.getElementById("selectionElement").style.color = "#777777";

  } else {
    //clear number label //HERE?
    document.getElementById("selectionElement").style.color = "black";
    document.getElementById("selectionElement").style.fontSize = "75%";
  }
  //HERE set style of selectionElement
}
/*//HERE
capitalize notes
when changing note mode, change position of the number on selectionElement based on the selected number
have a numbers page when you click the wrong answers button (number of undos, redos, restarts, total time (saved games), ingame time, etc?)
*/