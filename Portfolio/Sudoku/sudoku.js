/* variables */
var cells = new Array(81);
var currentCell = 0;

/* functions */

function c(c) {
  console.log(c);
}

function askDifficulty() {
  var difficulty = 30;
  //beginner 40
  //easy 35
  //med 30
  //hard 25
  //expert 20
  //HERE ask difficulty
  //adjust difficulty to rules
  setCells(difficulty);
}

function setCells(difficulty) {
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
        if (testVertical(currentCell, number) && testHorizonal(currentCell, number) && testBox(currentCell, number)) {
          //if(rules){
          //HERE
          invalid = false;
          //}
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
  if (currentCell==-1) {
    fail();
  } else {
    displayCells(difficulty);
  }
}

function testVertical(currentCell, number) {
  var availability = true;
  for (i = currentCell-9; i > -1; i -= 9) {
    if (cells[i] == number) {
      availability = false;
    }
  }
  return availability;
}

function testHorizonal(currentCell, number) {
  var availability = true;
  var rowStart = Math.floor(currentCell/9)*9;
  for (i = rowStart; i < rowStart+9; i++) {
    if (cells[i] == number) {
      availability = false;
    }
  }
  return availability;
}

function testBox(currentCell, number) {
  var availability = true;
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
  /* test box */
  for (i = currentCell + adjust; i >= stop; i -= 9) {
    if (cells[i] == number || cells[i+1] == number || cells[i+2] == number) {
      availability = false;
    }
  }
  return availability;
}

function fail() {
  alert("No possible games!");
}

function displayCells(minimumCells) {
  /* unsolve */
  var display = cells;
  var tested = new Array([0]);
  var stop = 81 - Math.floor(Math.random()*5+minimumCells);
  while (stop > 0 && tested.length <81) {
    var x = Math.floor(Math.random()*81);
    if(!tested.includes(x)){
      tested.push(x);
      if(unsolve(x)){
        display[x] = 0;
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

function unsolve(cell){
  var unsolvable = false;
  return unsolvable;
}