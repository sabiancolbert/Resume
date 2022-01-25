/* Globals */
//one extra cell for readability (82 cells instead of 81 cells so that cells[1] is the first cell instead of cells[0]~)
var cells = new Array(1);
//one extra for readability (10 instead of 9)
var numberTotals = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
//for game creation
var currentMove = 0;
var difficulty = 0;
var currentCell = 1;
var gridBox = document.getElementById("gridBox");
var selectionElement = document.getElementById("selectionElement");
var counterElement = document.getElementById("counterElement");
//for game play
var wrongList = new Array();
var redoList = new Array();
var undoList = new Array();
var currentSelection = 1;
var autoCheck = true; //HERE HERE false;
var autoRemoveNotes = false;
var sizingPage = false;
//for css themes
var darkColor = "#3388dd";
var lightColor = "#ccccee";
var textColor = "black";
var hintColor = "#777777";


/* Meta */

function c(c, location = 0) {
  if (location) {
    console.log(location + " " + c);
  } else {
    console.log(c);
  }
}

//HERE HERE make sure resizePageElements() is as awesome as possible
function resizePageElements() {
  c("resizePageElements()");
  if (!sizingPage) {
    sizingPage = true;
    var root = document.getElementsByTagName("html")[0];
    //gridBox = document.getElementById("gridBox");
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
        top = (height - width) + "px";
        right = 0;
        bottom = (height - width) + "px";
        left = 0;
        root.style.fontSize = width / 17 + "px";
      } else {
        top = height / 2 + "px";
        right = width - (height / 2) + "px";
        bottom = height / 2 + "px";
        left = width - (height / 2) + "px";
        root.style.fontSize = height / 2 / 17 + "px";
      }
    }
    /* Landscape */
    else {
      if (height * 2 < width) {
        top = 0;
        right = (width - height) + "px";
        bottom = 0;
        left = (width - height) + "px";
        root.style.fontSize = height / 17 + "px";
      } else {
        top = height - (width / 2) + "px";
        right = width / 2 + "px";
        bottom = height - (width / 2) + "px";
        left = width / 2 + "px";
        root.style.fontSize = width / 2 / 17 + "px";
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

//decide which numbers go to each cell
function decideGridNumbers() {
  c("decideGridNumbers()");
  //if difficulty has been chosen
  if (document.getElementById("difficultyElement").value < 81) {
    difficulty = document.getElementById("difficultyElement").value;
    document.getElementById("difficultyPromptElement").remove();
    /* Difficulty Legend */
    //beginner 45
    //easy 40
    //med 35
    //hard 30
    //expert 0
    /* Adjust Difficulty To Variants */
    {
      //HERE adjust difficulty to rules
    }
    /* Prepare For decideGridNumbers() */
    //counterElement = document.getElementById("counterElement");
    //selectionElement = document.getElementById("selectionElement");
    var attemptedNumbers = new Array(82);
    for (i = 1; i < 82; i++) {
      attemptedNumbers[i] = [];
      cells[i] = {
        "display": 0,
        /* Legend */
        //-2 small note
        //-1 grey note
        //0 empty
        //1+ number
        "isLocked": false,
        "isWrong": false,
        "element": document.getElementById("gridBox").children[0].children[i + Math.floor(i / 9)]
      };
    }
    /* Set Every Cell's Info (cells[0-80]) */
    while (currentCell > 0 && currentCell < 82) {
      var number = 0;
      var invalid = true;
      /* Try Each Number For Current Cell (0-80) */
      while (invalid && attemptedNumbers[currentCell].length < 9) {
        number = Math.floor(Math.random() * 9 + 1);
        if (!attemptedNumbers[currentCell].includes(number)) {
          invalid = false; //HERE HERE HERE
          attemptedNumbers[currentCell].push(number);
          if (!isInVertical(currentCell, number) && !isInHorizonal(currentCell, number) && !isInBox(currentCell, number)) {
            if (isVariantValid(currentCell, number)) {
              invalid = false;
            }
          }
        }
      }
      /* If No Numbers Are Valid */
      if (invalid) {
        attemptedNumbers[currentCell] = [];
        cells[currentCell].display = 0;
        currentCell--;
      }
      /* If Valid Number Is Found */
      else {
        cells[currentCell].display = number;
        currentCell++;
      }
    }
    /* Start Or noPossibleGames Game */
    if (currentCell == -1) {
      noPossibleGames();
    } else {
      displayGame();
    }
  }
}

//search for the same number in the same column
function isInVertical(cell, number) {
  var result = false;
  for (i = cell - 9; i > 0; i -= 9) {
    if (cells[i].display == number) {
      result = true;
    }
  }
  for (i = cell + 9; i < 82; i += 9) {
    if (cells[i].display == number) {
      result = true;
    }
  }
  return result;
}

//search for the same number in the same row
function isInHorizonal(cell, number) {
  var result = false;
  var rowStart = Math.floor((cell-1) / 9) * 9+1;
  c(cell +" "+rowStart, "row");
  for (i = rowStart; i < rowStart + 9; i++) {
    //HERE +9 instead of +8
    //HERE HERE HERE throws maybe 0's and 82's
    if (cells[i].display == number) {
      result = true;
    }
  }
  return result;
}

//search for the same number in the same 3x3 box
function isInBox(cell, number) {
  var result = false;
  /* Find  Box */
  var adjustY = cell;
  var adjustX = cell / 3 + " ";
  if (adjustX.includes(".6")) {
    adjustX = 1;
  } else if (adjustY.includes(".3")) {
    adjustX = 0;
  } else {
    -1
  }
  while (adjustY > 28) {
    adjustY -= 27;
  }
  adjustY = Math.floor(adjustY / 9) * 9;
  var stopCounter = cell - adjustX - adjustY;
  /* Test Box */
  for (i = stopCounter + 18; i >= stopCounter; i -= 9) {
    c(i, "box");
    if (cells[i].display == number || cells[i + 1].display == number || cells[i + 2].display == number) {
      result = true;
    }
  }
  return result;
}

//search for variant rules being broken
function isVariantValid(cell, number) {
  //HERE
  return true;
}

//alert the user that there are no possible games with these variant combinations
function noPossibleGames() {
  c("noPossibleGames()");
  alert("No possible games! Try removing some variants.");
}



/* Game Display */

//decide which cells to show and hide
function displayGame() {
  c("displayGame()");
  resizePageElements();
  //HERE HERE fix the amount of resizepageleemnts()
  //HERE HERE HERE change cell number to currentCekk
  /* Unsolve */
  var testedNumbers = new Array([0]);
  var stopCounter = 82 - Math.floor(Math.random() * 5 + parseInt(difficulty));
  while (stopCounter > 1 && testedNumbers.length < 82) {
    var cellNumber = Math.floor(Math.random() * 81) + 1;
    if (!testedNumbers.includes(cellNumber)) {
      testedNumbers.push(cellNumber);
      //is this cell solvable?
      c(cellNumber, "dis");
      if (isDefaultNumber(cellNumber) || isDefaultCell(cellNumber) || isVariantSolvable(cellNumber)) {
        //HERE set notes
        numberTotals[cells[cellNumber].display]++;
        cells[cellNumber].display = 0;
        stopCounter--;
      }
    }
  }
  noteCells = new Array(82);
  /* Display Cells */
  for (i = 1; i < 82; i++) {
    if (cells[i].display > 0) {
      cells[i].element.innerHTML = cells[i].display;
      cells[i].element.style.fontWeight = "1000";
    } else {
      cells[i].element.innerHTML = " ";
      userCells.push(i);
    }
  }
  /* Last Minute Game Prep */
  for (i = 1; i < 82; i++) {
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
  selectNumber(1);
}

//is this cells number the only option for this cell?
function isDefaultNumber(cell) {
  var result = false;
  var otherNumbers = new Array();
  //HERE test noteCells, use dummy numbers for next part
  for (x = 1; x < 10; x++) {
    if (x != cells[cell].display) {
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

//is this cell the only option for this cells number?
function isDefaultCell(cell) {
  var result = true;
  var emptyCells = new Array();
  //HERE test noteCells, use dummy numbers for next part
  /* Find Empty Cells In Row */
  var adjustX = Math.floor(cell-1 / 9) * 9 + 1;
  for (i = adjustX; i < adjustX + 9; i++) {
    if (cells[i].display == 0) {
      emptyCells.push(i);
    }
  }
  /* Find Empty Cells In Column */
  for (i = cell - 9; i > 0; i -= 9) {
    if (cells[i].display == 0) {
      emptyCells.push(i);
    }
  }
  for (i = cell + 9; i < 82; i += 9) {
    if (cells[i].display == 0) {
      emptyCells.push(i);
    }
  }
  /* Find Box */
  var adjustY = cell;
  adjustX = cell / 3 + " ";
  if (adjustX.includes(".6")) {
    adjustX = -2;
  } else if (temp.includes(".3")) {
    adjustX = -1;
  } else {
    adjustX = 0;
  }
  while (adjustY > 28) {
    adjustY -= 27;
  }
  adjustY = Math.floor(adjustY-1 / 9) * 9+1;
  /* Find Empty Cells In Box */
  var start = cell - adjustX - adjustY +1;
  c(start+" c"+cell+" x"+adjustX+" y"+adjustY, "def");
  if (cells[start].display == 0) {
    emptyCells.push(start);
  }
  if (cells[start + 1].display == 0) {
    emptyCells.push(start + 1);
  }
  if (cells[start + 2].display == 0) {
    emptyCells.push(start + 2);
  }
  if (cells[start + 9].display == 0) {
    emptyCells.push(start + 9);
  }
  if (cells[start + 10].display == 0) {
    emptyCells.push(start + 10);
  }
  if (cells[start + 11].display == 0) {
    emptyCells.push(start + 11);
  }
  if (cells[start + 18].display == 0) {
    emptyCells.push(start + 18);
  }
  if (cells[start + 19].display == 0) {
    emptyCells.push(start + 19);
  }
  if (cells[start + 20].display == 0) {
    emptyCells.push(start + 20);
  }
  cells[cell].display = cells[cell];
  /* Test Empty Cells */
  emptyCells.forEach(td => {
    if (result && !isInVertical(td, cells[cell].display) && !isInHorizonal(td, cells[cell].display)) {
      result = false;
    }
  });
  return result;
}

//can this cell be solved with variant rules?
function isVariantSolvable(cell) {

  //HERE
  return false;
}



/* Game Play */

//change selected number
function selectNumber(selection) {
  c("selectNumber(" + selection + ")");
  /* Set Grid HighlightColor */
  for (cellNumber = 1; cellNumber < 82; cellNumber++) {
    var cellElement = cells[cellNumber].element;
    //note highlightColor
    if (cells[cellNumber].display == -2) {
      for (i = 1; i < 10; i++) {
        if (i == selection) {
          document.getElementById("n" + i + cellNumber).style.backgroundColor = darkColor;
          document.getElementById("n" + i + cellNumber).style.zIndex = "1";
        } else {
          document.getElementById("n" + i + cellNumber).style.backgroundColor = lightColor;
          document.getElementById("n" + i + cellNumber).style.zIndex = "0";
        }
      }
    }
    //number highlightColor
    else if (selection == cellElement.innerHTML && cells[cellNumber].display != 0) {
      cellElement.style.backgroundColor = darkColor;
      if (cellElement.style.fontSize == "85%") {
        cellElement.style.color = lightColor;
      }
    }
    //no highlightColor
    else {
      cellElement.style.backgroundColor = lightColor;
      if (cellElement.style.fontSize == "85%") {
        cellElement.style.color = hintColor;
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
      selectionElement.style.color = textColor;
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

//change cell html
function changeCell(cellNumber, moveDirection = 0) {
  c("changeCell(" + cellNumber + ", " + ")");
  if (cell[cellNumber].element.innerHTML != " " || currentSelection != 0) {
    if (userCells.includes(cellNumber)) {
      var cellElement = cell[cellNumber].element;
      var cellNoteMode = cells[cellNumber].display;
      var content = selectionElement.innerHTML;
      //undo
      if (moveDirection == -1) {
        content = undoList[currentMove][1];
        cellNoteMode = undoList[currentMove][2];
      }
      //redo
      else if (moveDirection == 1) {
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
      if (cells[cellNumber].display > -2) {
        numberTotals[cellElement.innerHTML]++;
        if (cellElement.innerHTML == selectionElement.innerHTML) {
          counterElement.innerHTML = numberTotals[cellElement.innerHTML];
        }
      }
      /* Erase */
      if (cellNoteMode == 0) {
        cellElement.innerHTML = " ";
        cells[cellNumber].display = 0;
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
        cellElement.style.backgroundColor = lightColor;
      }
      /* Note Number */
      else if (cellNoteMode == -2) {
        /* Remove Note From Cell */
        if (moveDirection == 0 && noteCells[cellNumber][content] > 0) {
          document.getElementById("n" + content + cellNumber).style.visibility = "hidden";
          noteCells[cellNumber][content] = 0;
          //if empty
          if (noteCells[cellNumber][1] == 0 && noteCells[cellNumber][2] == 0 && noteCells[cellNumber][3] == 0 && noteCells[cellNumber][4] == 0 && noteCells[cellNumber][5] == 0 && noteCells[cellNumber][6] == 0 && noteCells[cellNumber][7] == 0 && noteCells[cellNumber][8] == 0 && noteCells[cellNumber][9] == 0) {
            cellElement.innerHTML = " ";
            cells[cellNumber].display = 0;
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
          cellElement.style.color = textColor;
          cellElement.style.backgroundColor = lightColor;
          cellElement.style.fontSize = "50%";
          //if not undo or redo
          if (moveDirection == 0) {
            if (cells[cellNumber].display != -2) {
              cellElement.innerHTML = "<div class='notesContainer'><p class='p1' id='n1" + cellNumber + "'>1</p><p class='p2' id='n2" + cellNumber + "'>2</p><p class='p3' id='n3" + cellNumber + "'>3</p><p class='p4' id='n4" + cellNumber + "'>4</p><p class='p5' id='n5" + cellNumber + "'>5</p><p class='p6' id='n6" + cellNumber + "'>6</p><p class='p7' id='n7" + cellNumber + "'>7</p><p class='p8' id='n8" + cellNumber + "'>8</p><p class='p9' id='n9" + cellNumber + "'>9</p></div>";
            }
            document.getElementById("n" + content + cellNumber).style.visibility = "visible";
            noteCells[cellNumber][content] = content;
          } else {
            cellElement.innerHTML = content;
          }
          cells[cellNumber].display = -2;
          for (i = 1; i < 10; i++) {
            if (i == selectionElement.innerHTML) {
              document.getElementById("n" + i + cellNumber).style.backgroundColor = darkColor;
              document.getElementById("n" + i + cellNumber).style.zIndex = "1";
            } else {
              document.getElementById("n" + i + cellNumber).style.backgroundColor = lightColor;
              document.getElementById("n" + i + cellNumber).style.zIndex = "0";
            }
          }
        }
      }
      /* Regular Number */
      else {
        cells[cellNumber].display = content;
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
          cellElement.style.color = hintColor;
          cellElement.style.fontSize = "85%";
          cells[cellNumber].display = -1;
        } else {
          cells[cellNumber].display = content;
          cellElement.style.fontSize = "100%";
          if (moveDirection == 0) {
            cellElement.style.color = textColor;
            if (checkAnswer(cellNumber)) {
              //HERE autoRemoveNotes();
            }
          } else if (moveDirection == -1) {
            cellElement.style.color = undoList[currentMove][3];
            //autoReplaceNotes();
          } else {
            cellElement.style.color = redoList[currentMove][3];
            //autoReplaceNotes();
          }
        }
      }
    }
    /* HighlightColor Numbers */
    if (content == selectionElement.innerHTML && currentSelection > -2 && cells[cellNumber].display != 0) {
      cellElement.style.backgroundColor = darkColor;
      if (cellElement.style.fontSize == "85%") {
        cellElement.style.color = lightColor;
      }
    }
    if (moveDirection == 0) {
      currentMove++;
      redoList[currentMove] = [
        cellNumber,
        cellElement.innerHTML,
        cellNoteMode,
        cellElement.style.color];
    }
  }
}

//undo or redo
function changeMove(direction) {
  c("changeMove(" + direction + ")");
  if (direction == -1 && currentMove > 0 || direction == 1 && currentMove < redoList.length - 1) {
    currentMove += direction;
    if (direction == -1) {
      /* Undo  Restart */
      if (undoList[currentMove][0] == 82) {
        //HERE
      }
      /* Normal Undo */
      else {
        changeCell(undoList[currentMove][0], direction);
      }
    } else {
      /* Redo Restart */
      if (redoList[currentMove][0] == 82) {
        //HERE
      }
      /* Normal Redo */
      else {
        changeCell(redoList[currentMove][0], direction);
      }
    }
  }
}

//checkAnswer(82, true) is autocheck button
//check cell answer or update autoCheck
function checkAnswer(cellNumber, changingAutoCheck = false) {
  c("checkAnswer(" + cellNumber + ", " + changingAutoCheck + ")");
  //HERE when unselecting autocheck, unred any red numbers
  var result = true;
  if (changingAutoCheck) {
    autoCheck = !autoCheck;
    if (autoCheck) {
      document.getElementById("wrongElement").style.visibility = "visible";
      for (i = 1; i < 82; i++) {
        if (cells[cellNumber].display > 0 && cells[cellNumber].display != cells[cellNumber]) {
          result = false;
          wrongList.push(cellNumber);
          cell[cellNumber].element.style.color = red;
        }
      }
    } else {
      document.getElementById("wrongElement").style.visibility = "hidden";
      for (i = 1; i < 82; i++) {
        if (wrongList.includes(cellNumber)) {
          wrongList.splice(wrongList.indexOf(cellNumber), 1);
          cell[cellNumber].element.style.color = textColor;
        }
      }
    }
  } else if (autoCheck) {
    var addOne = false;
    if (wrongList.includes(cellNumber)) {
      wrongList.splice(wrongList.indexOf(cellNumber), 1);
    }
    if (cells[cellNumber].display != cells[cellNumber]) {
      wrongList.push(cellNumber);
      cell[cellNumber].element.style.color = "red";
      addOne = true;
      result = false;
    }
    document.getElementById("wrongElement").innerHTML = parseInt(document.getElementById("wrongElement").innerHTML) + addOne;
  }
  return result;
}

//automatically remove invalid notes from grid
function autoRemoveNotes() {
  c("autoRemoveNotes()");
  //if autoremove notes in settings is on
  if (true) {
    //HERE
    //remove horizontal, vertical, and box
  } else {}
}

//change selected note mode
function updateNoteMode() {
  c("updateNoteMode()");
  selectionElement.style.padding = 0;
  /* Regular Number Mode */
  if (currentSelection == -2) {
    currentSelection = selectionElement.innerHTML;
    selectionElement.style.fontSize = "200%";
  }
  /* Grey Note Number Mode */
  else if (currentSelection > 0) {
    currentSelection = -1;
    selectionElement.style.color = hintColor;
    selectionElement.style.fontSize = "150%";
  }
  /* Note Mode */
  else if (currentSelection == -1) {
    currentSelection = -2;
    selectionElement.style.color = textColor;
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

//clear all answers
function restart() {
  c("restart()");
}

//toggle menu
function menu() {
  c("menu()");
  //HERE HERE HERE
  if (document.getElementById("menuElement").style.visibility == "visible") {
    document.getElementById("menuElement").style.visibility = "hidden";
    document.getElementById("menuElement").style.top = "-8%";
    document.getElementById("wrongElement").style.visibility = "visible";
  } else {
    document.getElementById("menuElement").style.visibility = "visible";
    document.getElementById("menuElement").style.top = "2%";
    document.getElementById("wrongElement").style.visibility = "hidden";
  }
}

/*//HERE
capitalize notes
have a numbers page when you click the wrong answers button (number of undos, redos, restarts, total time (saved games), ingame time, etc?)
please enable javascript screen
*/