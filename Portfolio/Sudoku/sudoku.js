/* variables */
var cells = new Array(81);
var currentCell = 0;

/* functions */

function c(c) {
  console.log(c);
}

function askDifficulty() {
  //ask difficulty
  setCells();
}

function setCells() {
  while (currentCell > -1 && currentCell < 81) {
    var number = 0;
    var attemptedNumbers = new Array(81);
    for (i = 0; i < 81; i++) {
      attemptedNumbers[i] = [0];
    }
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
    displayCells();
  }
}

function testVertical(currentCell, number) {
  /*var availability = true;
  for (i = currentCell-9; i > 0; i-9) {
    if (cells[i] == number) {
      availability = false;
    }
  }*/
  return true;
}

function testHorizonal(currentCell, number) {
  var availability = true;
  var rowStart = Math.floor(currentCell/9)*9+1;
  c("START "+rowStart);
  for (i = rowStart; i < rowStart+9; i++) {
    if (cells[i] == number) {
      availability = false;
    }
    c(rowStart +" "+i);
  }
  return availability;
}

function testBox(currentCell, number) {
  var availability = true;
  var stop = currentCell -9;
  var adjust = -2;
  var temp = Math.floor(currentCell/9-.1+1)/3-.1+1+" ";
  /* find vertical stop
  if (temp.includes(".5")) {
    stop -= 9;
  } else if (temp.includes(".9")) {
    stop -= 18;
  }
  /* find horizontal stop
  temp = currentCell / 3 +" ";
  if (temp.includes(".6")) {
    adjust = -1;
  } else if (temp.includes(".3")) {
    adjust = 0;
  }
  /* test box
  for (i = currentCell; i > stop; i-9) {
    if (cells[i+adjust] == number || cells[i+adjust+1] == number || cells[i+adjust+2] == number) {
      availability = false;
    }
  }*/
  return true;
}

function fail() {
  document.getElementById("js").innerHTML = "FAILED";
}

function displayCells() {
  /* unsolve */

  /* display cells */
  var display = cells;
  for (i = 0; i < 81; i++) {
    document.getElementById("c"+i).innerHTML = "<strong>"+cells[i]+"</strong>";
  }
}