/* --------- */
/* functions */
/* --------- */

function c(c) {
	console.log(c);
}

function onload() {
	console.log("start");
	/* create puzzle */
	var counter = 1;
	var boxArr = new Array(0);
	var clearArr = new Array(0);
	function fail() {
		alert("No possible games with these settings.");
	}
	function a1() {
		createCell(A1tried, A1tried, boxArr, 1, 1, X1, Y1, fail, a2);
	}
	function a2() {
		createCell(A2tried, A2tried, boxArr, 2, 1, X1, Y2, a1, a3);
	}
	function a3() {
		console.log("done");
	}
	a1();
	/* unsolve puzzle */
	{}
	/* display puzzle */
	counter = 1;
	function display(row) {
		for (var i = 1; i < 10; i++) {
			if (cells[counter] > 0) {
				document.getElementById(row + i).innerHTML = cells[counter];
				document.getElementById(row + i).style = "font-weight:bold;";
				setNumbers.push((row + i));
			}
			counter++;
		}
	}
	display("a");
	display("b");
	display("c");
	display("d");
	display("e");
	display("f");
	display("g");
	display("h");
	display("i");
}

function get(cellX, cellY, x, y) {
	cellX += x;
	cellY += y;
	if (cellX > 0 && cellX < 10 && cellY > 0 && cellY < 10) {
		if (cellY == 1) {
			return X1[cellX];
		} else if (cellY == 2) {
			return X2[cellX];
		} else if (cellY == 3) {
			return X3[cellX];
		} else if (cellY == 4) {
			return X4[cellX];
		} else if (cellY == 5) {
			return X5[cellX];
		} else if (cellY == 6) {
			return X6[cellX];
		} else if (cellY == 7) {
			return X7[cellX];
		} else if (cellY == 8) {
			return X8[cellX];
		} else if (cellY == 9) {
			return X9[cellX];
		}
	} else {
		return 0;
	}
}

function rules(x, y) {
	var invalid = false;
	/* consecutive */
	if (co) {}
	/* killer (cage) */
	if (ca) {}
	/* non consecutive */
	if (no) {}

	/* sandwich */
	if (sa) {}
	/* kropki */
	if (kr) {}
	/* xv */
	if (xv) {}

	/* thermo */
	if (th) {}
	/* palidrome */
	if (pa) {}
	/* arrow */
	if (ar) {}

	/* diagonal (bishop) */
	if (di) {}
	/* king */
	if (ki) {}
	/* knight */
	if (kn) {}

	return invalid;
}

function set(cell) {
	/* set cell */
	if (!setNumbers.includes(cell)) {
		document.getElementById(cell).innerHTML = document.getElementById("selection").innerHTML;
	}
	/* check answer */
	var answer = 0;
	if (cell.substring(0, 1) == "a") {
		answer = cell.substring(1, 2);
	} else if (cell.substring(0, 1) == "b") {
		answer = 9 + cell.substring(1, 2);
	} else if (cell.substring(0, 1) == "c") {
		answer = 18 + cell.substring(1, 2);
	} else if (cell.substring(0, 1) == "d") {
		answer = 27 + cell.substring(1, 2);
	} else if (cell.substring(0, 1) == "e") {
		answer = 36 + cell.substring(1, 2);
	} else if (cell.substring(0, 1) == "f") {
		answer = 45 + cell.substring(1, 2);
	} else if (cell.substring(0, 1) == "g") {
		answer = 54 + cell.substring(1, 2);
	} else if (cell.substring(0, 1) == "h") {
		answer = 63 + cell.substring(1, 2);
	} else if (cell.substring(0, 1) == "i") {
		answer = 72 + cell.substring(1, 2);
	}
	if (check && !cell.innerHTML == answer) {
		document.getElementById(cell).style = "color:red;";
	} else {
		document.getElementById(cell).style = "color:black;";
	}
}

/* cell functions */

function createCell(triedArr, clearArr, boxArr, x, y, xLine, yLine, previous, next) {
	var number = 0;
	invalid = true;
	while (invalid && triedArr.length < 9) {
		number = Math.floor(Math.random()*9+1);
		invalid = false;
		if (triedArr.includes(number)) {
			invalid = true;
		} else {
			triedArr.push(number);
			if (xLine.includes(number) || yLine.includes(number)) {
				invalid = true;
			} else if (boxArr.includes(number)) {
				invalid = true;
			} else {
				invalid = rules(x, y);
			}
		}
	}
	if (invalid) {
		clearArr = [];
		xLine[x] = 0;
		yLine[y] = 0;
		cellCounter--;
		previous();
	} else {
		xLine[x] = number;
		yLine[y] = number;
		cells[cellCounter] = number;
		cellCounter++;
		next();
	}
}



/* --------- */
/* variables */
/* --------- */

var cellCounter = 1;
var invalid = true;
var check = false;

/* rules */
var co = false;
var ca = false;
var no = false;

var sa = false;
var kr = false;
var xv = false;

var th = false;
var pa = false;
var ar = false;

var di = false;
var ki = false;
var kn = false;

/* board */

var setNumbers = new Array(0);
var cells = new Array(82);

//0,0 wont be used (for simplicity)
var X1 = new Array(10);
var X2 = new Array(10);
var X3 = new Array(10);
var X4 = new Array(10);
var X5 = new Array(10);
var X6 = new Array(10);
var X7 = new Array(10);
var X8 = new Array(10);
var X9 = new Array(10);

var Y1 = new Array(10);
var Y2 = new Array(10);
var Y3 = new Array(10);
var Y4 = new Array(10);
var Y5 = new Array(10);
var Y6 = new Array(10);
var Y7 = new Array(10);
var Y8 = new Array(10);
var Y9 = new Array(10);

/* ram for randomness */

var A1tried = new Array(0);
var A2tried = new Array(0);
var A3tried = new Array(0);
var A4tried = new Array(0);
var A5tried = new Array(0);
var A6tried = new Array(0);
var A7tried = new Array(0);
var A8tried = new Array(0);
var A9tried = new Array(0);

var B1tried = new Array(0);
var B2tried = new Array(0);
var B3tried = new Array(0);
var B4tried = new Array(0);
var B5tried = new Array(0);
var B6tried = new Array(0);
var B7tried = new Array(0);
var B8tried = new Array(0);
var B9tried = new Array(0);

var C1tried = new Array(0);
var C2tried = new Array(0);
var C3tried = new Array(0);
var C4tried = new Array(0);
var C5tried = new Array(0);
var C6tried = new Array(0);
var C7tried = new Array(0);
var C8tried = new Array(0);
var C9tried = new Array(0);

var D1tried = new Array(0);
var D2tried = new Array(0);
var D3tried = new Array(0);
var D4tried = new Array(0);
var D5tried = new Array(0);
var D6tried = new Array(0);
var D7tried = new Array(0);
var D8tried = new Array(0);
var D9tried = new Array(0);

var E1tried = new Array(0);
var E2tried = new Array(0);
var E3tried = new Array(0);
var E4tried = new Array(0);
var E5tried = new Array(0);
var E6tried = new Array(0);
var E7tried = new Array(0);
var E8tried = new Array(0);
var E9tried = new Array(0);

var F1tried = new Array(0);
var F2tried = new Array(0);
var F3tried = new Array(0);
var F4tried = new Array(0);
var F5tried = new Array(0);
var F6tried = new Array(0);
var F7tried = new Array(0);
var F8tried = new Array(0);
var F9tried = new Array(0);

var G1tried = new Array(0);
var G2tried = new Array(0);
var G3tried = new Array(0);
var G4tried = new Array(0);
var G5tried = new Array(0);
var G6tried = new Array(0);
var G7tried = new Array(0);
var G8tried = new Array(0);
var G9tried = new Array(0);

var H1tried = new Array(0);
var H2tried = new Array(0);
var H3tried = new Array(0);
var H4tried = new Array(0);
var H5tried = new Array(0);
var H6tried = new Array(0);
var H7tried = new Array(0);
var H8tried = new Array(0);
var H9tried = new Array(0);

var I1tried = new Array(0);
var I2tried = new Array(0);
var I3tried = new Array(0);
var I4tried = new Array(0);
var I5tried = new Array(0);
var I6tried = new Array(0);
var I7tried = new Array(0);
var I8tried = new Array(0);
var I9tried = new Array(0);
