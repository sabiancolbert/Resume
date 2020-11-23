var available = 0;
var tAvailable = 0;
var buttonHidden = false;

function onLoad() {
    console.log("ONLOAD {");
    //run any tests first
    test();

    //set age for summary page
    var date = new Date();
    var age = date.getFullYear() - 2001;
    if (date.getMonth() > 4 && date.getDate() > 1) {
        age++;
    }
    try {
        document.getElementById("age").innerText = age;
    }
    catch {
        //incase page isn't summary page
    }

    //set availability for summary page
    var date = new Date();
    var x = date.getDate() + 14;
    try {
        if (x >= 29 && date.getMonth() == 1) {//if February
            x = "March " + x - 29;
        }
        else if (x >= 30) {//if 30 month
            if (true) {
                x = 0;
            }
        }
        else if (x >= 31) {//if 31  month
            if (true) {
                x = 0;
            }
        }
        else {
            if (true) {//if same month
                x = 0;
            }
        }
        document.getElementById("availability").innerText = availability;
    }
    catch {
        //incase page isn't summary page
    }

    //set styles (other than css) so later code doesnt error from "undefined"
    nav.style.height = "50px";
    nav.style.width = "50px";
    tNav.style.height = "50px";
    tNav.style.width = "50px";
    console.log("ONLOAD }");
}

function onScroll() {
    console.log("ONSCROLL {");
    var nav = document.getElementById("nav");
    var button = document.getElementById("menuButton");

    //if scrolled >=27px down, and menu is closed, then allow menu button to hide (if scroll is < 50 it won't appear to change yet)
    if (document.documentElement.scrollTop >= 27 && nav.style.height == "50px") {
        button.style.top = "-27px";
        button.style.position = "fixed";
        console.log("ONSCROLL } menu is closed, scroll is >= 27; menu button allowed to hide");
    }
    //else if scroll is NOT >=27px, but menu is closed, then allow menu button to reveal
    else if (nav.style.height == "50px") {
        button.style.top = "0";
        button.style.position = "absolute";
        console.log("ONSCROLL } menu is closed, scroll is NOT >= 27; menu button allowed to reveal");
    }
    //else do nothing (menu button is fixed because the menu is open)
    else {
        console.log("ONSCROLL } menu is open; menu button not changed");
    }
}

//reveal menu button
function revealButton() {
    console.log("REVEALBUTTON {");
    var button = document.getElementById("menuButton");
    buttonHidden = false;

    //if button is hidden, then reveal button
    if (button.style.top != "0px") {
        var animation = setInterval(() => {
            if (button.style.top == "0px" || buttonHidden) {
                console.log("REVEALBUTTON } menu button revealed");
                clearInterval(animation);
            }
            else {
                button.style.top = trim(button.style.top) + 1 + "px";
            }
        }, 10);
    }
    else {
        console.log("REVEAL BUTTON } button not hidden, button not changed")
    }
}

//hide menu button
function hideButton() {
    console.log("HIDEBUTTON {");
    buttonHidden = true;
    //if scroll is >= 27 and an animation isn't in progress, then hide button
    if (document.documentElement.scrollTop >= 27 && available == 0) {
        var button = document.getElementById("menuButton");
        var animation = setInterval(() => {
            if (button.style.top == "-27px" || !buttonHidden) {
                console.log("HIDEBUTTON } menu button hidden");
                clearInterval(animation);
            }
            else {
                button.style.top = trim(button.style.top) - 1 + "px";
            }
        }, 10);
    }
    else {
        console.log("HIDEBUTTON } scroll isnt >= 27, button not changed");
    }
}

//when mouse leaves a <nav>
function testToggle() {
    //if nav is open and mouse has left nav area, toggle menu off (manual testing incase mouse goes over <a> tag)
    if (nav.style.height == "150px" || tNav.style.width == "150px") {
        var cX = event.clientX;
        var cY = event.clientY;
        if (cY > 150 || cX > 150 && cX < window.innerWidth - 150) {
            console.log("TESTTOGGLE { test passed, toggling menu }");
            if (nav.style.height == "150px") { toggleMenu(); }
            else { toggleTheme(); }
        }
        else {
            console.log("TESTTOGGLE { test failed, not changing menu }");
        }
    }
}

//toggle main menu open or closed
function toggleMenu() {
    available++;
    console.log("TOGGLEMENU { available = " + available);

    if (available == 1) {
        var button = document.getElementById("menuButton");
        var x = 0;
        var y = 1;
        //if closed, then open menu
        if (nav.style.height == "50px") {
            if (!buttonHidden || document.documentElement.scrollTop < 27) {
                button.style.width = "46px";
                button.style.zIndex = 0;
                button.style.opacity = 1;
                nav.style.opacity = 0;
                var animation = setInterval(() => {
                    //if done opening, then stop opening animation
                    if (nav.style.height == "150px" || available > 1) {
                        document.getElementById("1").hidden = false;
                        document.getElementById("2").hidden = false;
                        document.getElementById("3").hidden = false;
                        console.log("TOGGLEMENU } menu opened");
                        clearInterval(animation);
                    }
                    //else continue opening animation
                    else {
                        y -= .11;
                        nav.style.opacity = x;
                        nav.style.width = trim(nav.style.width) + 10 + "px";
                        nav.style.height = trim(nav.style.height) + 10 + "px";
                        button.style.opacity = y;
                        button.style.width = trim(button.style.width) + 10 + "px";
                        x += .11;
                    }
                }, 10);
            }
            else {
                console.log("TOGGLEMENU } button is hidden, menu not changed");
            }
        }
        //if open, then close menu
        else {
            button.style.zIndex = 4;
            var animation = setInterval(() => {
                //if done closing, then stop closing animation
                if (nav.style.height == "50px" || available > 1) {
                    document.getElementById("1").hidden = true;
                    document.getElementById("2").hidden = true;
                    document.getElementById("3").hidden = true;
                    //reset button position if scroll is now at top
                    if (nav.style.height != "150px" && document.documentElement.scrollTop <= 27) {
                        button.style.top = "0";
                        button.style.position = "absolute";
                    }
                    console.log("TOGGLEMENU } menu closed");
                    clearInterval(animation);
                }
                //else continue closing animation
                else {
                    y += .11;
                    nav.style.opacity = x;
                    nav.style.width = trim(nav.style.width) - 10 + "px";
                    nav.style.height = trim(nav.style.height) - 10 + "px";
                    button.style.opacity = y;
                    button.style.width = trim(button.style.width) - 10 + "px";
                    x -= .11;
                }
            }, 10);
        }
    }
    else {
        console.log("TOGGLEMENU } toggleMenu not available; menu not changed");
    }
    available--;
}

function testTheme() {
}

//toggle theme menu open or closed
function toggleTheme() {
    tAvailable++;
    console.log("TOGGLETHEME {  tAvailable = " + tAvailable)
    if (tAvailable == 1) {
        var nav = document.getElementById("tNav");
        var button = document.getElementById("theme");
        var x = 0;
        var y = 1;
        //if closed, then open menu
        if (nav.style.height == "50px") {
            button.style.width = "46px";
            button.style.zIndex = 0;
            button.style.opacity = 1;
            nav.style.opacity = 0;
            var animation = setInterval(() => {
                //if done opening, then stop opening animation
                if (nav.style.height == "150px") {
                    document.getElementById("4").hidden = false;
                    console.log("TOGGLEMENU } theme opened");
                    clearInterval(animation);
                }
                //else continue opening animation
                else {
                    y -= .11;
                    nav.style.opacity = x;
                    nav.style.width = trim(nav.style.width) + 10 + "px";
                    nav.style.height = trim(nav.style.height) + 10 + "px";
                    button.style.opacity = y;
                    button.style.width = trim(button.style.width) + 10 + "px";
                    x += .11;
                }
            }, 10);
        }
        //if open, then close menu
        else {
            button.style.zIndex = 4;
            var animation = setInterval(() => {
                //if done closing, then stop closing animation
                if (nav.style.height == "50px") {
                    document.getElementById("4").hidden = true;
                    console.log("TOGGLEMENU } theme closed");
                    clearInterval(animation);
                }
                //else continue closing animation
                else {
                    y += .11;
                    nav.style.opacity = x;
                    nav.style.width = trim(nav.style.width) - 10 + "px";
                    nav.style.height = trim(nav.style.height) - 10 + "px";
                    button.style.opacity = y;
                    button.style.width = trim(button.style.width) - 10 + "px";
                    x -= .11;
                }
            }, 10);
        }

    }
    else {
        console.log("TOGGLETHEME } toggleTheme not available, theme menu not changed")
    }
    tAvailable--;
}

//highlight and expand <a>
function expand(x) {
    document.getElementById(x).style.fontSize = "27px";
    document.getElementById(x).style.color = "white";
    console.log("EXPAND { expanded option \"" + x + "\" }");
}

//unhighlight and shrink <a>
function shrink(x) {
    document.getElementById(x).style.fontSize = "25px";
    document.getElementById(x).style.color = "black";
    console.log("SHRINK { shrank option \"" + x + "\" }");
}

//remove "px" and return as int
function trim(x) {
    try {
        return parseInt(x.substring(0, x.length - 2));
    }
    catch {
        return 0;
    }
}

function t(x) {
    console.log("--TEST--" + x);
}

function test() {
}