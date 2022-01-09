/* Globals */
var cells = new Array(81);
var noteCells = new Array(81);
var displayCells = new Array(81);
var userCells = new Array([]);
var numberTotals = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var wrongList = new Array();
var undoList = new Array();
var redoList = new Array();
var currentMove = 0;
var difficulty = 0;
var currentCell = 0;
var currentSelection = 1;
var autoCheck = true;
var autoRemoveNotes = false;
var sizingPage = false;
var gridBox, counterElement, selectionElement;
var background = "#222222";
var dark = "#3388dd";
var light = "#ccccee";
var text = "black";
var hint = "#777777";

function c(c) {
  console.log(c);
}

function getCell(cellNumber) {
  return document.getElementById("gridBox").children[0].children[cellNumber + Math.floor(cellNumber/9)];
}

function sizePage() {
  if (!sizingPage) {
    sizingPage = true;
    var root = document.getElementsByTagName("html")[0];
    gridBox = document.getElementById("gridBox");
    var width = window.innerWidth;
    var height = window.innerHeight;
    var buttonBox = document.getElementById("buttonBox");
    var top = 0;
    var right = 0;
    var bottom = 0;
    var left = 0;
    /* Portrait */
    if (width < height) {
      if (width * 2 < height) {
        top = (height-width)+"px";
        right = 0;
        bottom = (height-width)+"px";
        left = 0;
        root.style.fontSize = width/17+"px";
      } else {
        top = height/2+"px";
        right = width-(height/2)+"px";
        bottom = height/2+"px";
        left = width-(height/2)+"px";
        root.style.fontSize = height/2/17+"px";
      }
    }
    /* Landscape */
    else {
      if (height * 2 < width) {
        top = 0;
        right = (width-height)+"px";
        bottom = 0;
        left = (width-height)+"px";
        root.style.fontSize = height/17+"px";
      } else {
        top = height-(width/2)+"px";
        right = width/2+"px";
        bottom = height-(width/2)+"px";
        left = width/2+"px";
        root.style.fontSize = width/2/17+"px";
      }
    }
    /* Set Css */
    document.getElementById("gridBox").style.bottom = bottom;
    document.getElementById("gridBox").style.right = right;
    buttonBox.style.top = top;
    buttonBox.style.left = left;
    sizingPage = false;
  }
}

/* Game Creation */

function setCells() {
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
  alert("No possible games! Try removing some variants.");
}

//display the "displayCells" array on the grid
function setGrid() {
  sizePage();
  /* Unsolve */
  var testedNumbers = new Array([0]);
  var stopCounter = 81 - Math.floor(Math.random()*5+parseInt(difficulty));
  while (stopCounter > 0 && testedNumbers.length < 81) {
    var cellNumber = Math.floor(Math.random()*81);
    if (!testedNumbers.includes(cellNumber)) {
      testedNumbers.push(cellNumber);
      //is this cell solvable?
      if (isDefaultNumber(cellNumber) || isDefaultCell(cellNumber) || isVariantSolvable(cellNumber)) {
        //HERE set notes
        numberTotals[displayCells[cellNumber]]++;
        displayCells[cellNumber] = 0;
        stopCounter--;
      }
    }
  }
  noteCells = new Array(81);
  /* Display Cells */
  for (i = 0; i < 81; i++) {
    if (displayCells[i] > 0) {
      getCell(i).innerHTML = displayCells[i];
      getCell(i).style.fontWeight="1000";
    } else {
      getCell(i).innerHTML = "&nbsp";
      userCells.push(i);
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
  /* Set Grid Highlight */
  for (cellNumber = 0; cellNumber < 81; cellNumber++) {
    var cellElement = getCell(cellNumber);
    //note highlight
    if (displayCells[cellNumber]==-2) {
      for (i = 1; i < 10; i++) {
        if (i == selection) {
          document.getElementById("n"+i+cellNumber).style.backgroundColor = dark;
          document.getElementById("n"+i+cellNumber).style.zIndex = "1";
        } else {
          document.getElementById("n"+i+cellNumber).style.backgroundColor = light;
          document.getElementById("n"+i+cellNumber).style.zIndex = "0";
        }
      }
    }
    //number highlight
    else if (selection == cellElement.innerHTML && displayCells[cellNumber] != 0) {
      cellElement.style.backgroundColor = dark;
      if (cellElement.style.fontSize == "85%") {
        cellElement.style.color = light;
      }
    }
    //no highlight
    else {
      cellElement.style.backgroundColor = light;
      if (cellElement.style.fontSize == "85%") {
        cellElement.style.color = hint;
      }
    }
  }
  selectionElement.style.padding = "0";
  /* Select Number */
  if (selection != 0) {
    counterElement.style.visibility = "visible";
    counterElement.innerHTML = numberTotals[selection];
    selectionElement.innerHTML = selection;
    if (currentSelection == 0) {
      selectionElement.style.fontSize = "200%";
      selectionElement.style.color = text;
      currentSelection = selection;
    }
  } else {
    currentSelection = 0;
    selectionElement.innerHTML = " ";
    counterElement.style.visibility = "hidden";
  }
  if (currentSelection == -2) {
    switch (selection) {
      case 1:
        selectionElement.style.padding = "0 10% 10% 0";
        break;
      case 2:
        selectionElement.style.padding = "0 0 10% 0";
        break;
      case 3:
        selectionElement.style.padding = "0 0 10% 10%";
        break;
      case 4:
        selectionElement.style.padding = "0 10% 0 0";
        break;
      case 5:
        selectionElement.style.padding = "0 0 0 0";
        break;
      case 6:
        selectionElement.style.padding = "0 0 0 10%";
        break;
      case 7:
        selectionElement.style.padding = "10% 10% 0 0";
        break;
      case 8:
        selectionElement.style.padding = "10% 0 0 0";
        break;
      case 9:
        selectionElement.style.padding = "10% 0 0 10%";
        break;
    }
  }
}

function set(cellNumber, direction = 0) {
  c("set" +cellNumber);
  if (userCells.includes(cellNumber)) {
    var cellElement = getCell(cellNumber);
    var cellNoteMode = displayCells[cellNumber];
    var content = selectionElement.innerHTML;
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
      if (cellElement.innerHTML == selectionElement.innerHTML && currentSelection == cellNoteMode) {
        cellNoteMode = 0;
      } else {
        cellNoteMode = currentSelection;
      }
    }
    //counter element
    if (displayCells[cellNumber] > -2) {
      numberTotals[cellElement.innerHTML]++;
      if (cellElement.innerHTML == selectionElement.innerHTML) {
        counterElement.innerHTML = numberTotals[cellElement.innerHTML];
      }
    }
    /* Erase */
    if (cellNoteMode == 0) {
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
      cellElement.style.backgroundColor = light;
    }
    /* Note Number */
    else if (cellNoteMode == -2) {
      /* Remove Note From Cell */
      if (direction == 0 && noteCells[cellNumber][content] > 0) {
        document.getElementById("n"+content+cellNumber).style.visibility = "hidden";
        noteCells[cellNumber][content] = 0;
        //if empty
        if (noteCells[cellNumber][1] == 0 && noteCells[cellNumber][2] == 0 && noteCells[cellNumber][3] == 0 && noteCells[cellNumber][4] == 0 && noteCells[cellNumber][5] == 0 && noteCells[cellNumber][6] == 0 && noteCells[cellNumber][7] == 0 && noteCells[cellNumber][8] == 0 && noteCells[cellNumber][9] == 0) {
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
        cellElement.style.color = text;
        cellElement.style.backgroundColor = light;
        cellElement.style.fontSize = "50%";
        //if not undo or redo
        if (direction == 0) {
          if (displayCells[cellNumber] !=-2) {
            cellElement.innerHTML = "<div class='notesContainer'><p class='p1' id='n1"+cellNumber+"'>1</p><p class='p2' id='n2"+cellNumber+"'>2</p><p class='p3' id='n3"+cellNumber+"'>3</p><p class='p4' id='n4"+cellNumber+"'>4</p><p class='p5' id='n5"+cellNumber+"'>5</p><p class='p6' id='n6"+cellNumber+"'>6</p><p class='p7' id='n7"+cellNumber+"'>7</p><p class='p8' id='n8"+cellNumber+"'>8</p><p class='p9' id='n9"+cellNumber+"'>9</p></div>";
          }
          document.getElementById("n"+content+cellNumber).style.visibility = "visible";
          noteCells[cellNumber][content] = content;
        } else {
          cellElement.innerHTML = content;
        }
        displayCells[cellNumber] = -2;
        for (i = 1; i < 10; i++) {
          if (i == selectionElement.innerHTML) {
            document.getElementById("n"+i+cellNumber).style.backgroundColor = dark;
            document.getElementById("n"+i+cellNumber).style.zIndex = "1";
          } else {
            document.getElementById("n"+i+cellNumber).style.backgroundColor = light;
            document.getElementById("n"+i+cellNumber).style.zIndex = "0";
          }
        }
      }
    }
    /* Regular Number */
    else {
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
        cellElement.style.color = hint;
        cellElement.style.fontSize = "85%";
        displayCells[cellNumber] = -1;
      } else {
        displayCells[cellNumber] = content;
        cellElement.style.fontSize = "100%";
        if (direction == 0) {
          cellElement.style.color = text;
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
  /* Highlight Numbers */
  if (content == selectionElement.innerHTML && currentSelection > -2 && displayCells[cellNumber] != 0) {
    cellElement.style.backgroundColor = dark;
    if (cellElement.style.fontSize == "85%") {
      cellElement.style.color = light;
    }
  }
  if (direction == 0) {
    currentMove++;
    redoList[currentMove] = [
      cellNumber,
      cellElement.innerHTML,
      cellNoteMode,
      cellElement.style.color];
  }
}

function changeMove(direction) {
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
  //HERE when unselecting autocheck, unred any red numbers
  var result = true;
  if (changingAutoCheck) {
    autoCheck=!autoCheck;
    if (autoCheck) {
      document.getElementById("wrongElement").style.visibility = "visible";
      for (i = 0; i < 81; i++) {
        if (displayCells[cellNumber] > 0 && displayCells[cellNumber] != cells[cellNumber]) {
          result = false;
          wrongList.push(cellNumber);
          getCell(cellNumber).style.color = red;
        }
      }
    } else {
      document.getElementById("wrongElement").style.visibility = "hidden";
      for (i = 0; i < 81; i++) {
        if (wrongList.includes(cellNumber)) {
          wrongList.splice(wrongList.indexOf(cellNumber), 1);
          getCell(cellNumber).style.color = text;
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
      getCell(cellNumber).style.color = "red";
      addOne = true;
      result = false;
    }
    document.getElementById("wrongElement").innerHTML = parseInt(document.getElementById("wrongElement").innerHTML) + addOne;
  }
  return result;
}

function autoRemoveNotes() {
  //if autoremove notes in settings is on
  if (true) {
    //HERE
    //remove horizontal, vertical, and box
  } else {}
}

function updateNoteMode() {
  selectionElement.style.padding = 0;
  /* Regular Number Mode */
  if (currentSelection == -2) {
    currentSelection = selectionElement.innerHTML;
    selectionElement.style.fontSize = "200%";
  }
  /* Grey Note Number Mode */
  else if (currentSelection > 0) {
    currentSelection = -1;
    selectionElement.style.color = hint;
    selectionElement.style.fontSize = "150%";
  }
  /* Note Mode */
  else if (currentSelection==-1) {
    currentSelection=-2;
    selectionElement.style.color = text;
    selectionElement.style.fontSize = "75%";
    switch (parseInt(selectionElement.innerHTML)) {
      case 1:
        selectionElement.style.padding = "0 10% 10% 0";
        break;
      case 2:
        selectionElement.style.padding = "0 0 10% 0";
        break;
      case 3:
        selectionElement.style.padding = "0 0 10% 10%";
        break;
      case 4:
        selectionElement.style.padding = "0 10% 0 0";
        break;
      case 5:
        selectionElement.style.padding = "0 0 0 0";
        break;
      case 6:
        selectionElement.style.padding = "0 0 0 10%";
        break;
      case 7:
        selectionElement.style.padding = "10% 10% 0 0";
        break;
      case 8:
        selectionElement.style.padding = "10% 0 0 0";
        break;
      case 9:
        selectionElement.style.padding = "10% 0 0 10%";
        break;
    }
  }
  /* Eraser */
  if (selectionElement.innerHTML == " ") {
    currentSelection = 0;
  }
}

function restart() {}

function menu() {
  document.getElementById("menuElement").style.visibility = !document.getElementById("menuElement").style.visibility;
}

/*//HERE
capitalize notes
have a numbers page when you click the wrong answers button (number of undos, redos, restarts, total time (saved games), ingame time, etc?)
please enable javascript screen
*/