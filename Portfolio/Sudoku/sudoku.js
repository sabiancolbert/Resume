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

function verticle(currentCell, number) {
  var availability = true;
  for (i = currentCell-9; i > 0; i-9) {
    if (cells[i] == number) {
      availability = false;
    }
  }
  return availability;
}

function testHorizonal(currentCell, number) {
  var availability = true;
  var rowStart = Math.floor(currentCell/9)*9+1;
  for(i=rowStart;i< rowStart+9;i++){
    if(cells[i]){
      availability=false;
    }
  }
  return availability;
}

function testBox(currentCell, number) {
  var availability = true;
  var stop = currentCell -9;
  var adjust = -2;
  var temp = Math.floor(currentCell/9-.1+1)/3-.1+1+" ";
  if(temp.includes(".5")){
    stop -= 9;
  }
  else if(temp.includes(".9")){
    stop-=18;
  }
  temp = currentCell / 3 +" ";
  if(temp.includes(".6")){
    adjust= -1;
  }
  else if (temp.includes(".3")){
    adjust = 0;
  }
  for(i=currentCell;i>stop;i-9){
    if(cells[i+adjust]==number||cells[i+adjust+1]==number||cells[i+adjust+2]==number){
      availability=false;
    }
  }
  return availability;
}

function fail() {}

function displayCells() {}