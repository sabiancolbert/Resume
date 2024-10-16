var mouse = true;
var buttonRevealed = false;

/* set up page*/
function onload() {
	//size title
	setTitle();

	//set menu button
	setButton();
console.log("trying");
onload2();
}


/* determine and set title */
function setTitle() {
	if (window.innerWidth < 650) {
		try {
			document.getElementById("name").innerHTML = "Sabian";
		}
		catch {
			try {
				document.getElementById("emp").innerHTML = "Emp.";
			}catch {
				try {
					document.getElementById("edu").innerHTML = "Edu.";
				}catch {
					try {
						document.getElementById("docs").innerHTML = "Docs";
					}
					catch {
						document.getElementById("port").innerHTML = "W.I.P.";
					}
				}
			}
		}

	} else {
		try {
			document.getElementById("name").innerHTML = "Sabian Colbert";
		}catch {
			try
			{
				document.getElementById("emp").innerHTML = "Employment";
			}catch {
				try {
					document.getElementById("edu").innerHTML = "Education";
				}catch {
					try {
						document.getElementById("docs").innerHTML = "Documents";
					}catch {
						document.getElementById("port").innerHTML = "Work In Progress";
					}
				}
			}
		}
	}
}

/* themes button */
function theme() {
	window.location.replace("/themes.html");
}

/*/determine menu button position
document.getElementById("nav").addEventListener('touchstart', event =>  {
  console.log("herryuiooo");
//	mouse = false;
	//console.log("mousing"+mouse);
});
//document.getElementById("name").innerHTML="HDhDH";
	
/* set menu button position */
function setButton() {
	toggleMenu(false, false);
	//scroll is >=40px, allow menu button to hide (if scroll is < 40 it won't appear to change yet)
	if (mouse && document.documentElement.scrollTop >= 40) {
		if (!buttonRevealed) {
			menuButton.style.top = "-40px";
		}
		menuButton.style.position = "fixed";

	}

	//scroll is NOT >=40px, allow menu button to reveal
	else if (mouse) {
		menuButton.style.top = "0px";
		menuButton.style.position = "absolute";
	}

	//if mobile, fix button
	else {
		menuButton.style.top = "0px";
		menuButton.style.position = "fixed";
	}
}

/* reveal menu button */
function revealButton(override = false) {
	buttonRevealed = true;
	if (mouse) {

		//if button needs revealed, then reveal button
		if (menuButton.style.top == "-40px" || override) {
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
}

/* hide menu button */
function hideButton(override = false) {
	buttonRevealed = false;
	if (mouse) {

		//if button needs hidden, then hide button
		if ((menuButton.style.top == "0px" || override) && document.documentElement.scrollTop >= 54) {
			var animation = setInterval(() => {
				if (menuButton.style.top == "-40px" || buttonRevealed) {
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
}

/* toggle nav menu */
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

/* drop downs */
function drop(label, text = false){
	var section = document.getElementById(label);
	var sectionLabel = document.getElementById(label + "Label");
	if(!text){
		text = label;
	}
	
	section.hidden = !section.hidden;
	if(section.hidden){
		sectionLabel.innerHTML = text + " ▼"
	}
	else{
		sectionLabel.innerHTML = text + " ▲"
	}
}
