/* Globals */
var cells = new Array(81);
var displayCells = new Array([]);
var userCells = new Array([]);
var numberTotals = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var noteCells = new Array(81);
var moveList = new Array([]);
var currentMove = 0;
var lastMove = 0;
var difficulty = 0;
var currentCell = 0;
var noteMode = 0;
var selectionElement, counterElement;

function c(c) {
  console.log(c);
}

/* Game Creation */

function askDifficulty() {
  c("askDifficulty()");
  selectionElement = document.getElementById("selectionElement");
  counterElement = document.getElementById("counterElement");

  //beginner 45
  //easy 40
  //med 35
  //hard 30
  //expert 25

  //HERE HERE ask difficulty
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
    var cellNumber = Math.floor(Math.random()*81);
    if (!tested.includes(cellNumber)) {
      tested.push(cellNumber);
      tested.push(cellNumber);
      //is this cell solvable?
      if (isDefaultNumber(cellNumber) || isDefaultCell(cellNumber)) {
        numberTotals[displayCells[cellNumber]]++;
        displayCells[cellNumber] = 0;
        userCells.push(cellNumber);
        stop--;
      }
    }
  }
  //HERE dont do whats under me. criss cross shouldnt be happening so fix that instead
  //HERE if there are unsolvable criss crossed cells, plug one corner in here
  /* Display Cells */
  for (i = 0; i < 81; i++) {
    if (displayCells[i] > 0) {
      document.getElementById("c"+i).innerHTML = "<bold>"+displayCells[i]+"</strong>";
    }
  }
  /* Last Minute Game Prep */
  for (i = 0; i < 81; i++) {
    noteCells[i] = [0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0];
  }
  select(1);
}

//is this number the only option for this cell?
function isDefaultNumber(cell) {
  var result = false;
  var otherNumbers = new Array([]);
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
  // Set Grid Highlight */
  for (i = 0; i < 81; i++) {
    var cellElement = document.getElementById("c"+i);
    if (number != displayCells[i] || displayCells [i] == " ") {
      cellElement.style.backgroundColor = "#ccccee";
      if (cellElement.style.fontSize == "125%") {
        cellElement.style.color = "#777777";
      }
    } else {
      cellElement.style.backgroundColor = "#3388dd";
      if (cellElement.style.fontSize == "125%") {
        cellElement.style.color = "#ccccee";
      }
    }
  }
  /* Select Number */
  if (number != 0) {
    counterElement.innerHTML = numberTotals[number];
    selectionElement.innerHTML = number;
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

function set(id, useSelection = true) {
  c("set("+id+")");
  var cellElement = document.getElementById(id);
  var cellNumber = id.substring(1, id.length) * 1;
  var newHTML ="";
  if(useSelection){
  newHTML = selectionElement.innerHTML;
  }
  else{
    newHTML = ;
  }
  if (userCells.includes(cellNumber)) {
    /* Update Old Number */
    if (cellElement.innerHTML - 0 > 0 && displayCells[cellNumber]!=-1) {
      numberTotals[cellElement.innerHTML]++;
    }
    /* Erase */
    if (newHTML == " ") {
      c("set - erase cell");
      cellElement.innerHTML = " ";
      displayCells[cellNumber] = 0;
      noteCells[cellNumber] = [];
    }
    /* Note Number */
    else if (noteMode == 2) {
      /* Remove Note From Cell */
      c(cellNumber+" "+newHTML +" "+noteCells[0][1]);
      if (noteCells[cellNumber][newHTML] > 0) {
        c("set - remove note from cell");
        document.getElementById("n"+newHTML+cellNumber).style.visibility = "hidden";
        noteCells[cellNumber][newHTML] = 0;
      }
      /* Add Note To Cell */
      else {
        c("set - add note to cell");
        if (displayCells[cellNumber] !=-1) {
          cellElement.innerHTML = "<div class='notesContainer'><div name='h1' class='noteHolder'><p class='p1' id='n1"+cellNumber+"'>1</p></div><div name='h2' class='noteHolder'><p id='n2"+cellNumber+"'>2</p></div><div name='h3' class='noteHolder'><p class='p3' id='n3"+cellNumber+"'>3</p></div><div class='noteHolder'><p class='p4' id='n4"+cellNumber+"'>4</p></div><div class='noteHolder'><p id='n5"+cellNumber+"'>5</p></div><div class='noteHolder'><p class='p6' id='n6"+cellNumber+"'>6</p></div><div name='h7' class='noteHolder'><p class='p7' id='n7"+cellNumber+"'>7</p></div><div name='h8' class='noteHolder'><p id='n8"+cellNumber+"'>8</p></div><div name='h9' class='noteHolder'><p class='p9' id='n9"+cellNumber+"'>9</p></div></div>";
        }
        document.getElementById("n"+newHTML+cellNumber).style.visibility = "visible";
        noteCells[cellNumber][newHTML] = newHTML;
        displayCells[cellNumber]=-1;
        cellElement.style.color = "black";
        cellElement.style.backgroundColor = "#ccccee";
        cellElement.style.fontSize = "75%";
      }
    }
    /* Regular Number */
    else {
      c("set - add number to cell");
      if (displayCells[cellNumber] != newHTML || noteMode != noteCells[cellNumber]) {
        displayCells[cellNumber] = newHTML;
        cellElement.innerText = selectionElement.innerText;
        numberTotals[cellElement.innerHTML]--;
        counterElement.innerHTML = numberTotals[cellElement.innerHTML];
        cellElement.style.backgroundColor = "#3388dd";
        if (noteMode == 1) {
          cellElement.style.color = "#ccccee";
          cellElement.style.fontSize = "125%";
          noteCells[cellNumber] = [0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0];
        } else {
          displayCells[cellNumber] = newHTML;
          cellElement.style.color = "black";
          cellElement.style.fontSize = "150%";
          noteCells[cellNumber] = [0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0];
          if (check()) {
            autoRemoveNotes();
          }
        }
      }
    }
    /* Update Move List */
    moveList.push([noteMode, cellElement.id, cellElement.innerHTML])
    lastMove++;
    currentMove = lastMove;
  }
}

function check() {
  var result = true;
  //if autocheck in settings
  if (false) {
    var counter = 0;
    for (i = 0; i < 81; i++) {
      //compare displayCells to cells
      if (true)//HERE
      {
        counter++;
        //element.style.color = red
        result = false
      }
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

function changeMove(direction) {
  c("changeMove("+direction+")");
  if (direction == -1 && currentMove > 0 || direction == 1 && currentMove < lastMove) {
    currentMove += direction;
    var move = moveList[currentMove];
    set(move[1], false);
    /*numberTotals[move[1].innerHTML]++;
    //HERE HERE HERE
    if(selectionElement.innerHTML==move[1].innerHTML){
      counterElement.innerHTML = numberTotals[selectionElement.innerHTML];
    }
    /* Update Old Cell Number */
    /*move[1].innerHTML = move[2];
    if (move[0]!=2){
      displayCells[(move[1].id+"0").substring(1,2)]=move[2];
    }
    else{
      displayCells[(move[1].id+"0").substring(1,2)]=-1;
    }
    //HERE set noteCells (copy paste from set())
    numberTotals[move[1].innerHTML]--;
    if(move[2]==selectionElement.innerHTML)
    {
      counterElement.innerHTML=numberTotals[move[2]];
    }
  */
  }
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
have a numbers page when you click the wrong answers button (number of undos, redos, restarts, total time (saved games), ingame time, etc?)
when unselecting autocheck, unred any red numbers
solving it on 0 only requires basic sudoku skills *sigh*
cefcu horizontals for notes to solve it (hypothetical notes)
*/