/* Globals */
var cells = new Array(81);
var noteCells = new Array(81);
var displayCells = new Array([]);
var userCells = new Array([]);
var numberTotals = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var wrongList = new Array();
var undoList = new Array();
var redoList = new Array();
var currentMove = 0;
var difficulty = 0;
var currentCell = 0;
var selectionNoteMode = 0;
var autoCheck = true;
var autoRemoveNotes = false;
var sizingPage = false;
var counterElement, selectionElement;

function c(c) {
  console.log(c);
}

function sizePage() {
  if (!sizingPage) {
    c("sizePage()");
    sizingPage = true;
    var root = document.getElementsByTagName("html")[0];
    var height = window.innerHeight;
    var width = window.innerWidth;
    var gridBox = document.getElementById("gridBox");
    var buttonBox = document.getElementById("buttonBox");
    var top = 0;
    var right = 0;
    var bottom = 0;
    var left = 0;
    /* Portrait */
    if (width < height) {
      c("sizePage - portrait");
      if (width * 2 < height) {
        c("a");
        top = (height-width)+"px";
        right = 0;
        bottom = (height-width)+"px";
        left = 0;
        root.style.fontSize = width/17+"px";
      } else {
        c("b");
        top = height/2+"px";
        right = width-(height/2)+"px";
        bottom = height/2+"px";
        left = width-(height/2)+"px";
        root.style.fontSize = height/2/17+"px";
      }
    }
    /* Landscape */
    else {
      c("sizePage - landscape");
      if (height * 2 < width) {
        c("c");
        top = 0;
        right = (width-height)+"px";
        bottom = 0;
        left = (width-height)+"px";
        root.style.fontSize = height/17+"px";
      } else {
        c("d");
        top = width/2+"px";
        right = width/2+"px";
        bottom = width/2+"px";
        left = width/2+"px";
        root.style.fontSize = width/2/17+"px";
      }
    }
    /* Set Css */
    gridBox.style.bottom = bottom;
    gridBox.style.right = right;
    buttonBox.style.top = top;
    buttonBox.style.left = left;
    sizingPage = false;
  }
}
function getCell(cellNumber) {
  //cellNumber = cellNumber +1+Math.floor((cellNumber+1)/9);
  var element = document.getElementsByTagName("table")[0].rows[Math.floor(cellNumber/9)].cells[cellNumber-(9*Math.floor(cellNumber/9))];
  return element;
}

/* Game Creation */

function setCells() {
  c("setCells()");
  sizePage();
  if (document.getElementById("difficultyElement").value < 81) {
    difficulty = document.getElementById("difficultyElement").value;
    document.getElementById("difficultyPromptElement").innerHTML = "";
    document.getElementById("gameElement").style.visibility = "visible";
    //beginner 45
    //easy 40
    //med 35
    //hard 30
    //expert 0
    //HERE adjust difficulty to rules
    c("setCells - difficulty = "+difficulty);
    counterElement = document.getElementById("counterElement");
    selectionElement = document.getElementById("selectionElement");
    var attemptedNumbers = new Array(81);
    for (i = 0; i < 81; i++) {
      attemptedNumbers[i] = [0];
    }
    while (currentCell > -1 && currentCell < 81) {
      var currentNumber = 0;
      var invalid = true;
      /* Set Current Cell */
      while (invalid && attemptedNumbers[currentCell].length < 10) {
        currentNumber = Math.floor(Math.random()*9+1);
        if (!attemptedNumbers[currentCell].includes(currentNumber)) {
          attemptedNumbers[currentCell].push(currentNumber);
          if (!isInVertical(currentCell, currentNumber) && !isInHorizonal(currentCell, currentNumber) && !isInBox(currentCell, currentNumber)) {
            if (variantValid(currentCell, currentNumber)) {
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
        cells[currentCell] = currentNumber;
        displayCells[currentCell] = currentNumber;
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
  /* Find stopCounterping Cell */
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
  var stopCounter = cell + adjust - temp;
  /* Test Box */
  for (i = stopCounter + 18; i >= stopCounter; i -= 9) {
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
  var testedNumbers = new Array([0]);
  var stopCounter = 81 - Math.floor(Math.random()*5+parseInt(difficulty));
  while (stopCounter > 0 && testedNumbers.length < 81) {
    var cellNumber = Math.floor(Math.random()*81);
    if (!testedNumbers.includes(cellNumber)) {
      testedNumbers.push(cellNumber);
      testedNumbers.push(cellNumber);
      //is this cell solvable?
      if (isDefaultNumber(cellNumber) || isDefaultCell(cellNumber) || isVariantSolvable(cellNumber)) {
        //HERE set notes
        numberTotals[displayCells[cellNumber]]++;
        displayCells[cellNumber] = 0;
        userCells.push(cellNumber);
        stopCounter--;
      }
    }
  }
  noteCells = new Array(81);
  //HERE dont do whats under me. criss cross shouldnt be happening so fix that instead
  //HERE if there are unsolvable criss crossed cells, plug one corner in here
  /* Display Cells */
  for (i = 0; i < 81; i++) {
    if (displayCells[i] > 0) {
      getCell(i).innerHTML = "<bold>"+displayCells[i]+"</strong>";
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
  var otherNumbers = new Array();
  //HERE test noteCells, use dummy numbers for next part
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
  //HERE test noteCells, use dummy numbers for next part
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
  emptyCells.forEach(td => {
    if (result && !isInVertical(td, displayCells[cell]) && !isInHorizonal(td, displayCells[cell])) {
      result = false;
    }
  });
  return result;
}

function isVariantSolvable(cell) {
  //HERE
  return false;
}
/* Gameplay */

function select(selection) {
  c("select("+selection+")")
  /* Set Grid Highlight */
  for (cellNumber = 0; cellNumber < 81; cellNumber++) {
    var cellElement = getCell(cellNumber);
    //note highlight
    if (displayCells[cellNumber]==-2) {
      for (i = 1; i < 10; i++) {
        if (i == selection) {
          document.getElementById("n"+i+cellNumber).style.backgroundColor = "#3388dd";
          document.getElementById("n"+i+cellNumber).style.zIndex = "1";
        } else {
          document.getElementById("n"+i+cellNumber).style.backgroundColor = "#ccccee";
          document.getElementById("n"+i+cellNumber).style.zIndex = "0";
        }
      }
    }
    //number highlight
    else if (selection == cellElement.innerHTML && displayCells[cellNumber] != 0) {
      cellElement.style.backgroundColor = "#3388dd";
      if (cellElement.style.fontSize == "125%") {
        cellElement.style.color = "#ccccee";
      }
    }
    //no highlight
    else {
      cellElement.style.backgroundColor = "#ccccee";
      if (cellElement.style.fontSize == "125%") {
        cellElement.style.color = "#777777";
      }
    }
  }
  /* Select Number */
  if (selection != 0) {
    counterElement.style.visibility = "visible";
    counterElement.innerHTML = numberTotals[selection];
    selectionElement.innerHTML = selection;
  } else {
    selectionElement.innerHTML = " ";
    counterElement.style.visibility = "hidden";
  }
  if (selectionNoteMode == -2) {
    switch (selection) {
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

function set(cellNumber, direction = 0) {
  c("set("+cellNumber+","+direction+")");
  if (userCells.includes(cellNumber)) {
    var cellElement = getCell(cellNumber);
    var cellNoteMode = displayCells[cellNumber];
    var content = selectionElement.innerHTML;
    if (content == " " || content == cellElement.innerHTML && selectionNoteMode == cellNoteMode && cellNoteMode > -2) {
      cellNoteMode = 0;
    }
    //undo
    if (direction ==-1) {
      content = undoList[currentMove][1];
      cellNoteMode = undoList[currentMove][2];

    }
    //redo
    else if (direction == 1) {
      content = redoList[currentMove][1];
      cellNoteMode = redoList[currentMove][2];
    }
    //regular
    else {
      redoList.push([]);
      undoList.push([]);
      undoList[currentMove] = [
        cellNumber,
        cellElement.innerHTML,
        cellNoteMode,
        cellElement.style.color];
      cellNoteMode = selectionNoteMode + !selectionNoteMode;
    }
    c("selectionNoteMode"+selectionNoteMode+"content"+content+"cellNoteMode"+cellNoteMode);
    //counter element
    if (displayCells[cellNumber] > -2) {
      numberTotals[cellElement.innerHTML]++;
      if (cellElement.innerHTML == selectionElement.innerHTML) {
        counterElement.innerHTML = numberTotals[cellElement.innerHTML];
      }
    }
    /* Erase */
    if (cellNoteMode == 0) {
      c("set - erase cell");
      cellElement.innerHTML = " ";
      displayCells[cellNumber] = 0;
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
      cellElement.style.backgroundColor = "#ccccee";
    }
    /* Note Number */
    else if (cellNoteMode == -2) {
      /* Remove Note From Cell */
      if (direction == 0 && noteCells[cellNumber][content] > 0) {
        c("set - remove note from cell");
        document.getElementById("n"+content+cellNumber).style.visibility = "hidden";
        noteCells[cellNumber][content] = 0;
        //if empty
        if (noteCells[cellNumber][1] == 0 && noteCells[cellNumber][2] == 0 && noteCells[cellNumber][3] == 0 && noteCells[cellNumber][4] == 0 && noteCells[cellNumber][5] == 0 && noteCells[cellNumber][6] == 0 && noteCells[cellNumber][7] == 0 && noteCells[cellNumber][8] == 0 && noteCells[cellNumber][9] == 0) {
          c("set - erase note cell");
          cellElement.innerHTML = " ";
          displayCells[cellNumber] = 0;
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
        }
      }
      /* Add Note To Cell */
      else {
        c("set - add note to cell");
        cellElement.style.color = "black";
        cellElement.style.backgroundColor = "#ccccee";
        cellElement.style.fontSize = "75%";
        //if not undo or redo
        if (direction == 0) {
          if (displayCells[cellNumber] !=-2) {
            cellElement.innerHTML = "<div class='notesContainer'><div name='h1' class='noteHolder'><p class='p1' id='n1"+cellNumber+"'>1</p></div><div name='h2' class='noteHolder'><p id='n2"+cellNumber+"'>2</p></div><div name='h3' class='noteHolder'><p class='p3' id='n3"+cellNumber+"'>3</p></div><div class='noteHolder'><p class='p4' id='n4"+cellNumber+"'>4</p></div><div class='noteHolder'><p id='n5"+cellNumber+"'>5</p></div><div class='noteHolder'><p class='p6' id='n6"+cellNumber+"'>6</p></div><div name='h7' class='noteHolder'><p class='p7' id='n7"+cellNumber+"'>7</p></div><div name='h8' class='noteHolder'><p id='n8"+cellNumber+"'>8</p></div><div name='h9' class='noteHolder'><p class='p9' id='n9"+cellNumber+"'>9</p></div></div>";
          }
          document.getElementById("n"+content+cellNumber).style.visibility = "visible";
          noteCells[cellNumber][content] = content;
        } else {
          cellElement.innerHTML = content;
        }
        displayCells[cellNumber] = -2;
      }
    }
    /* Regular Number */
    else {
      c("set - add number to cell");
      displayCells[cellNumber] = content;
      cellElement.innerHTML = content;
      numberTotals[content]--;
      if (content == selectionElement.innerHTML) {
        counterElement.innerHTML = numberTotals[content];
      }
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
      if (cellNoteMode == -1) {
        cellElement.style.color = "#ccccee";
        cellElement.style.fontSize = "125%";
        displayCells[cellNumber] = -1;
      } else {
        displayCells[cellNumber] = content;
        cellElement.style.fontSize = "150%";
        if (direction == 0) {
          cellElement.style.color = "black";
          if (check(cellNumber)) {
            //HERE autoRemoveNotes();
          }
        } else if (direction==-1) {
          cellElement.style.color = undoList[currentMove][3];
          //autoReplaceNotes();
        } else {
          cellElement.style.color = redoList[currentMove][3];
          //autoReplaceNotes();
        }
      }
    }
  }
  //highlight
  select(selectionElement.innerHTML);
  if (direction == 0) {
    currentMove++;
    redoList[currentMove] = [
      cellNumber,
      cellElement.innerHTML,
      cellNoteMode,
      cellElement.style.color];
    c("set - add to redoList " + redoList[currentMove]);
  }
}

function changeMove(direction) {
  c("changeMove("+direction+")");
  if (direction == -1 && currentMove > 0 || direction == 1 && currentMove < redoList.length -1) {
    currentMove += direction;
    if (direction==-1) {
      /* Undo  Restart */
      if (undoList[currentMove][0] == 81) {
        //HERE
      }
      /* Normal Undo */
      else {
        set(undoList[currentMove][0], direction);
      }
    } else {
      /* Redo Restart */
      if (redoList[currentMove][0] == 81) {
        //HERE
      }
      /* Normal Redo */
      else {
        set(redoList[currentMove][0], direction);
      }
    }
  }
}

//check(81, true) is autocheck button
function check(cellNumber, changingAutoCheck = false) {
  var result = true;
  if (changingAutoCheck) {
    autoCheck=!autoCheck;
    if (autoCheck) {
      document.getElementById("wrongElement").style.visibility = "visible";
      for (i = 0; i < 81; i++) {
        if (displayCells[cellNumber] > 0 && displayCells[cellNumber] != cells[cellNumber]) {
          result = false;
          wrongList.push(cellNumber);
          document.getElementById("c"+cellNumber).style.color = red;
        }
      }
    } else {
      document.getElementById("wrongElement").style.visibility = "hidden";
      for (i = 0; i < 81; i++) {
        if (wrongList.includes(cellNumber)) {
          wrongList.splice(wrongList.indexOf(cellNumber), 1);
          document.getElementById("c"+cellNumber).style.color = black;
        }
      }
    }
  } else if (autoCheck) {
    var addOne = false;
    if (wrongList.includes(cellNumber)) {
      wrongList.splice(wrongList.indexOf(cellNumber), 1);
    }
    if (displayCells[cellNumber] != cells[cellNumber]) {
      wrongList.push(cellNumber);
      document.getElementById("c"+cellNumber).style.color = "red";
      addOne = true;
      result = false;
    }
    document.getElementById("wrongElement").innerHTML = parseInt(document.getElementById("wrongElement").innerHTML) + addOne;
  }
  c("check() = "+result);
  return result;
}

function autoRemoveNotes() {
  c("autoRemoveNotes() ="); /*
   //if autoremove notes in settings is on
   if (true) {
      c("true");
      //HERE
      //remove horizontal, vertical, and box
   } else {
      c("false");
   }*/
}

function updateNoteMode() {
  c("updateNoteMode()");
  selectionNoteMode--;
  selectionElement.style.padding = 0;
  /* Regular Number Mode */
  if (selectionNoteMode < -2) {
    selectionNoteMode = 0;
    selectionElement.style.fontSize = "300%";
  }
  /* Grey Note Number Mode */
  else if (selectionNoteMode == -1) {
    selectionElement.style.color = "#777777";
    selectionElement.style.fontSize = "225%";
  }
  /* Note Mode */
  else
  {
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

function restart() {
  c("restart()");

}

function menu() {
  c("menu()");
  document.getElementById("menuElement").style.visibility = !document.getElementById("menuElement").style.visibility;
}

/*//HERE
HERE HERE HERE replace "c"+# with table.child
capitalize notes
see if a switch() would be useful anywhere
have a numbers page when you click the wrong answers button (number of undos, redos, restarts, total time (saved games), ingame time, etc?)
when unselecting autocheck, unred any red numbers
solving it on 0 only requires basic sudoku skills *sigh*
cefcu horizontals for notes to solve it (hypothetical notes)
*/