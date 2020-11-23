var available = 0;
var tAvailable = 0;
var buttonHidden = false;

function onLoad() {
    console.log("ONLOAD {");
//rebuild for noscript
    if (false) {
        document.getElementById("1").hidden = true;
        document.getElementById("2").hidden = true;
        document.getElementById("3").hidden = true;
        document.getElementById("menuButton").hidden = false;
        document.getElementById("theme").hidden = false;
        section.style.top = "0";
        nav.style.opacity = "0";
        nav.style.position = "fixed";
    }

    //run any tests first
    test();

    //set age for summary page
    var date = new Date();
    var age = date.getFullYear() - 2001;
    if (date.getMonth() > 4 && date.getDate() > 1) {
        age++;
    }
    try {
        console.log("ONLOAD age = " + age);
        document.getElementById("age").innerText = age;
    }
    catch {
        //incase page isn't summary page
        console.log("ONLOAD age did not work (likely not summary page)");
    }

    //set availability for summary page
    var date = new Date();
    var month = date.getMonth();
    var x = date.getDate() + 14;
    try {
        //set variables
        {
            if (x >= 29 && date.getMonth() == 1) {
                x -= 29;
                month++;
            }
            else if (x >= 30 && (date.getMonth() == 3 || date.getMonth() == 5 || date.getMonth() == 8 || date.getMonth() == 10)) {
                x -= 30;
                month++;
            }
            else if (x >= 31) {
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
            }
            else if (x.substring(x.length - 1, x.length) == 2) {
                x += "nd";
            }
            else if (x.substring(x.length - 1, x.length) == 3) {
                x += "rd";
            }
            else {
                x += "th";
            }
            console.log("ONLOAD x = " + x);
        }
        //set month
        {
            if (month == 0) {
                x = "Jan " + x;
            }
            else if (month == 1) {
                x = "Feb " + x;
            }
            else if (month == 2) {
                x = "Mar " + x;
            }
            else if (month == 3) {
                x = "Apr " + x;
            }
            else if (month == 4) {
                x = "May " + x;
            }
            else if (month == 5) {
                x = "Jun " + x;
            }
            else if (month == 6) {
                x = "Jul " + x;
            }
            else if (month == 7) {
                x = "Aug " + x;
            }
            else if (month == 8) {
                x = "Sep " + x;
            }
            else if (month == 9) {
                x = "Oct " + x;
            }
            else if (month == 10) {
                x = "Nov " + x;
            }
            else {
                x = "Dec " + x;
            }
        }
        console.log("ONLOAD x = " + x);
        document.getElementById("availability").innerText = x;
    }
    catch {
        //incase page isn't summary page
        console.log("ONLOAD availability did not work (likely not summary page)");
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