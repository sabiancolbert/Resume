var mouse = false;
var buttonRevealed = false;

function setName() {
	if (window.innerWidth < 650) {
		document.getElementById("name").innerHTML = "Sabian";
	} else {
		document.getElementById("name").innerHTML = "Sabian Colbert";
	}
}

function onload() {
	//size name
	setName();

	//set age for summary page
	if (document.getElementById("pageAge").innerHTML == " ") {
		var date = new Date();
		var age = date.getFullYear() - 2001;
		if (date.getMonth() > 4 && date.getDate() > 1) {
			age++;
		}
		document.getElementById("pageAge").innerHTML = age++ + " year old ";
	}

	//set availability for summary page
	if (document.getElementById("availability").innerHTML == "2 weeks from now") {
		var month = date.getMonth();
		var x = date.getDate() + 14;
		//set variables
		{
			if (x >= 29 && date.getMonth() == 1) {
				x -= 29;
				month++;
			} else if (x >= 30 && (date.getMonth() == 3 || date.getMonth() == 5 || date.getMonth() == 8 || date.getMonth() == 10)) {
				x -= 30;
				month++;
			} else if (x >= 31) {
				x -= 31;
				month++;
			}
			if (month == 12) {
				month = 0;
			}
			console.log("ONLOAD x = " + x + "; month = " + month);
		}
		//set suffix
		{
			x += "";
			if (x.substring(x.length - 1, x.length) == 1) {
				x += "st";
			} else if (x.substring(x.length - 1, x.length) == 2) {
				x += "nd";
			} else if (x.substring(x.length - 1, x.length) == 3) {
				x += "rd";
			} else {
				x += "th";
			}
			console.log("ONLOAD x = " + x);
		}
		//set month
		{
			if (month == 0) {
				x = "Jan " + x;
			} else if (month == 1) {
				x = "Feb " + x;
			} else if (month == 2) {
				x = "Mar " + x;
			} else if (month == 3) {
				x = "Apr " + x;
			} else if (month == 4) {
				x = "May " + x;
			} else if (month == 5) {
				x = "Jun " + x;
			} else if (month == 6) {
				x = "Jul " + x;
			} else if (month == 7) {
				x = "Aug " + x;
			} else if (month == 8) {
				x = "Sep " + x;
			} else if (month == 9) {
				x = "Oct " + x;
			} else if (month == 10) {
				x = "Nov " + x;
			} else {
				x = "Dec " + x;
			}
		}
		console.log("ONLOAD x = " + x);
		availability.innerText = x;
	}
}

//themes button
function theme() {
	console.log("theme");
	window.location.replace("/themes.html");
}
//HERE fix comments 😭
//detect touch vs cursor
document.documentElement.addEventListener('mousemove', e => {
	mouse = true;
	console.log("mouse");
});

//automatically hide/reveal menu button
function setButton() {
	document.getElementById("test").innerText = (document.documentElement.scrollTop +" ");
	toggleMenu(false, false);
	//scroll is >=54px, allow menu button to hide (if scroll is < 54 it won't appear to change yet)
	if (mouse && document.documentElement.scrollTop >= 1900) {
		if (!buttonRevealed) {
			menuButton.style.top = "-35px";
		}
		menuButton.style.position = "fixed";
	}
	//scroll is NOT >=27px, allow menu button to reveal
	else if (mouse) {
		menuButton.style.top = "0px";
		menuButton.style.position = "absolute";
	}
	//mobile
	else {
		menuButton.style.top = "0px";
		menuButton.style.position = "fixed";
	}
}

//reveal menu button
function revealButton(override = false) {
	buttonRevealed = true;

	//if button needs revealed, then reveal button
	if (menuButton.style.top == "-54px" || override) {
		var animation = setInterval(() => {
			if (menuButton.style.top == "0px" || !buttonRevealed) {
				clearInterval(animation);
				if (!buttonRevealed) {
					hideButton(true);
				}
			} else {
				menuButton.style.top = Number(menuButton.style.top.substring(0, menuButton.style.top.length - 2)) + 2 + "px";
			}
		},
			10);
	}
}

//hide menu button
function hideButton(override = false) {
	buttonRevealed = false;

	//if button needs hidden, then hide button
	if ((menuButton.style.top == "0px" || override) && document.documentElement.scrollTop >= 54) {
		var animation = setInterval(() => {
			if (menuButton.style.top == "-54px" || buttonRevealed) {
				clearInterval(animation);
				if (buttonRevealed) {
					revealButton(true);
				}
			} else {
				menuButton.style.top = Number(menuButton.style.top.substring(0, menuButton.style.top.length - 2)) - 2 + "px";
			}
		},
			10);
	}
}

//toggle nav menu
function toggleMenu(open, setbutton = true) {
	if (open) {
		nav.hidden = false;
		menuButton.hidden = true;
	} else {
		nav.hidden = true;
		menuButton.hidden = false;
		if (setbutton) {
			setButton();
		}
	}
}