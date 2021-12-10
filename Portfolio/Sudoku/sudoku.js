/* Globals */
var cells = new Array(81);
var displayCells = new Array();
var userCells = new Array();
var numberTotals = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var noteModeCells = new Array(81);
var moveList = new Array();
var difficulty = 40;
var currentCell = 0;
var noteMode = 0;
var currentMove = 0;

function c(c) {
  console.log(c);
}

/* Game Creation */

function askDifficulty() {
  c("askDifficulty()");
  //beginner 45
  //easy 40
  //med 35
  //hard 30
  //expert 25

  //HERE ask difficulty
  //adjust difficulty to rules
  /* Generate Number Board */
  setCells();
}

//generate number board
function setCells() {
  c("setCells()");
  var attemptedNumbers = new Array(81);
  for (i = 0; i < 81; i++) {
    attemptedNumbers[i] = [0];
  }
  while (currentCell > -1 && currentCell < 81) {
    var number = 0;
    var invalid = true;
    /* Set Current Cell */
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
    /* Previous Cell */
    if (invalid) {
      attemptedNumbers[currentCell] = [0];
      displayCells[currentCell] = 0;
      currentCell--;
    }
    /* Next Cell */
    else {
      cells[currentCell] = number;
      displayCells[currentCell] = number;
      currentCell++;
    }
  }
  /* Start Or Fail Game */
  if (currentCell==-1) {
    fail();
  } else {
    setGrid();
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
  /* Find Stopping Cell */
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
  /* Test Box */
  for (i = stop + 18; i >= stop; i -= 9) {
    if (displayCells[i] == number || displayCells[i+1] == number || displayCells[i+2] == number) {
      result = true;
    }
  }
  return result;
}

//check each rule the user added
function variantValid(cell, number) {
  //HERE
  return true;
}

//no possible games
function fail() {
  c("fail()");
  alert("No possible games! Try removing some variants.");
}

//display the "displayCells" array on the grid
function setGrid() {
  c("setGrid()");
  /* Unsolve */
  var tested = new Array([0]);
  var stop = 81 - Math.floor(Math.random()*5+difficulty);
  while (stop > 0 && tested.length < 81) {
    var cell = Math.floor(Math.random()*81);
    if (!tested.includes(cell)) {
      tested.push(cell);
      //is this cell solvable?
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
  /* Find Empty Cells In Row */
  var temp = Math.floor(cell/9)*9;
  for (i = temp; i < temp+9; i++) {
    if (displayCells[i] == 0) {
      emptyCells.push(i);
    }
  }
  /* Find Empty Cells In Column */
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
  /* Find Box */
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
  /* Find Empty Cells In Box */
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
  /* Test Empty Cells */
  emptyCells.forEach(option => {
    if (result && !isInVertical(option, displayCells[cell]) && !isInHorizonal(option, displayCells[cell])) {
      result = false;
    }
  });
  return result;
}

/* Gameplay */

function select(number) {
  c("select("+number+")")
  var selectionElement = document.getElementById("selectionElement");
  var counterElement = document.getElementById("counterElement");
  //dont clear highlight, for visually easier erasing
  if (number != 0) {
    counterElement.innerHTML = numberTotals[number-1];
    selectionElement.innerHTML = number;
    //HERE change highlight
  } else {
    selectionElement.innerHTML = " ";
    counterElement.innerHTML = "Erase";
  }
  if (noteMode == 2) {
    switch (number) {
      case 1:
        selectionElement.style.padding = "0 60% 60% 0";
        break;
      case 2:
        selectionElement.style.padding = "0 0 60% 0";
        break;
      case 3:
        selectionElement.style.padding = "0 0 60% 60%";
        break;
      case 4:
        selectionElement.style.padding = "0 60% 0 0";
        break;
      case 5:
        selectionElement.style.padding = "0 0 0 0";
        break;
      case 6:
        selectionElement.style.padding = "0 0 0 60%";
        break;
      case 7:
        selectionElement.style.padding = "60% 60% 0 0";
        break;
      case 8:
        selectionElement.style.padding = "60% 0 0 0";
        break;
      case 9:
        selectionElement.style.padding = "60% 0 0 60%";
        break;
    }
  }
}

function set(id) {
  c("set("+id+")");
  var cellElement = document.getElementById(id);
  var cellNumber = id.substring(1, id.length) * 1;
  var selectionElement = document.getElementById("selectionElement");
  var counterElement = document.getElementById("counterElement");
  if (userCells.includes(cellNumber)) {
    /* Set As Number */
    if (noteMode != 2) {
      if (displayCells[cellNumber] != selectionElement.innerHTML || noteMode != noteModeCells[cellNumber]) {
        /* Update Old Cell Number */
        if (cellElement.innerHTML +1 != 1) {
          numberTotals[cellElement.innerHTML - 1]++;
        }
        moveList.push([noteMode, cellElement, cellElement.innerHTML])
        currentMove++;
        /* Update New Cell Number */
        cellElement.innerText = selectionElement.innerText;
        if (cellElement.innerHTML > 0) {
          numberTotals[cellElement.innerHTML - 1]--;
          counterElement.innerHTML = numberTotals[cellElement.innerHTML -1];
        } else {
          if (selectionElement.innerHTML = " ") {
            counterElement.innerHTML = "Erase";
          } else {
            counterElement.innerHTML = "";
          }
        }
        displayCells[cellNumber] = selectionElement.innerHTML
        autoRemoveNotes();
        if (noteMode == 1) {
          cellElement.style.color = "#777777";
          cellElement.style.fontSize = "125%";
          noteModeCells[cellNumber] = 1;
        } else {
          cellElement.style.color = "black";
          cellElement.style.fontSize = "150%";
          noteModeCells[cellNumber] = 0;
          if (check()) {
            autoRemoveNotes();
          }
        }
      }
    }
    /* Set As Note */
    else {
      c("set - set as note");
      /* Remove Number From Cell */
      if noteModeCell[cellNumber].includes (selectionElement.innerHTML){
      c("set - remove number from cell");
        
      }
      /* Add Number To Cell */
      else{
        c("set - add number to cell");
      var string = "<div class='notesholder'><article hidden='true' id='n1"+cellNumber+"'>1</article><article hidden='true' id='n2"+cellNumber+"'>2</article><article hidden='true' id='n3"+cellNumber+"'>3</article><article hidden='true' id='n4"+cellNumber+"'>4</article><article hidden='true' id='n5"+cellNumber+"'>5</article><article hidden='true' id='n6"+cellNumber+"'>6</article><article hidden='true' id='n7"+cellNumber+"'>7</article><article hidden='true' id='n8"+cellNumber+"'>8</article><article hidden='true' id='n9"+cellNumber+"'>9</article></div>";
      cellElement.innerHTML = string;
      cellElement.style.color = "black";
      document.getElementById("n1"+cellNumber).hidden = "false";
      noteModeCells[cellNumber].push([selectionElement.innerHTML]);
      displayCells[cellNumber]=-1;
      c(document.getElementById("n1"+cellNumber));
      //HERE ^^^ HERE HERE
    }
    }
  }
}

function check() {
  var result = true;
  //if autocheck in settings
  if (false) {
    var counter = 0;
    //compare displayCells to cells
    if (true)//HERE
    {
      result = false
    }
    document.getElementById("wrongElement").innerHTML = counter;
  }
  c("check() = "+result);
  return result;
}

function autoRemoveNotes() {
  c("autoRemoveNotes() =");
  //if autoremove notes in settings is on
  if (true) {
    c("true");
    //HERE
    //remove horizontal, vertical, and box
  } else {
    c("false");
    {}
  }
}

function updateNoteMode() {
  c("updateNoteMode()");
  var selectionElement = document.getElementById("selectionElement");
  noteMode++;
  selectionElement.style.padding = 0;
  /* Regular Number Mode */
  if (noteMode > 2) {
    noteMode = 0;
    selectionElement.style.fontSize = "300%";
  }
  /* Grey Note Number Mode */
  else if (noteMode == 1) {
    selectionElement.style.color = "#777777";
    selectionElement.style.fontSize = "225%";

  }
  /* Note Mode */
  else {
    selectionElement.style.color = "black";
    selectionElement.style.fontSize = "100%";
    switch (selectionElement.innerHTML * 1) {
      case 1:
        selectionElement.style.padding = "0 60% 60% 0";
        break;
      case 2:
        selectionElement.style.padding = "0 0 60% 0";
        break;
      case 3:
        selectionElement.style.padding = "0 0 60% 60%";
        break;
      case 4:
        selectionElement.style.padding = "0 60% 0 0";
        break;
      case 5:
        selectionElement.style.padding = "0 0 0 0";
        break;
      case 6:
        selectionElement.style.padding = "0 0 0 60%";
        break;
      case 7:
        selectionElement.style.padding = "60% 60% 0 0";
        break;
      case 8:
        selectionElement.style.padding = "60% 0 0 0";
        break;
      case 9:
        selectionElement.style.padding = "60% 0 0 60%";
        break;
    }
  }
}

function undo() {
  c("undo()");
}

function redo() {
  c("redo()");
}

function restart() {
  c("restart()");
}

function menu() {
  c("menu()");
}

/*//HERE
capitalize notes
see if a switch() would be useful anywhere
when changing note mode, change position of the number on selectionElement based on the selected nu
have a numbers page when you click the wrong answers button (number of undos, redos, restarts, total time (saved games), ingame time, etc?)
*/