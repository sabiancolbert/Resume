/* variables */
var cells = new Array(81);
var currentCell = 0;

/* functions */
function askDifficulty() {
  //ask difficulty
  setCells();
}

function setCells() {
  while (currentCell > -1 && currentCell < 81) {
    var number = 0;
    var attemptedNumbers = new Array([], []);
    var invalid = true;
    /* set current cell */
    while (invalid && attemptedNumbers[currentCell].length < 9) {
      number = Math.floor(Math.random()*9+1);
      if (!attemptedNumbers[currentCell].includes(number)) {
        attemptedNumbers[currentCell].push(number);
        if (vertical(currentCell, number) && horizontal(currentCell, number) && box(currentCell, number)) {
          //if(rules){
          //HERE
          invalid = false;
          //}
        }
      }
    }
    /* previous cell */
    if (invalid) {
      attemptedNumbers[currentCell] = [];
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

function verticle(currentCell, number) {}

function horizontal(currentCell, number) {}

function box(currentCell, number) {}

function fail() {}

function displayCells() {}