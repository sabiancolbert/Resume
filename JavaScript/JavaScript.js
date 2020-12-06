function $($) { return document.getElementById($); }
var available = 0;
var tAvailable = 0;//z of jobs
var buttonHidden = false;
var javaScript = true;
//here change images on hover
function onLoad() {
    if (javaScript) {//here in html, add test toggle  to almost everything
        console.log("ONLOAD {");
        //available = 0;
        //tAvailable = 0;
        buttonHidden = false;

        //rebuild for noscript
        document.body.style.top = "-60px";
        nav.style.position = "fixed";
        nav.style.top = "0";
        nav.style.height = "300px";
        tNav.style.height = "300px";
        //here CSS: nav a {textdecoration="none"}
        toggleMenu();
        toggleTheme();

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
            $("age").innerText = age;
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
            $("availability").innerText = x;
        }
        catch {
            //incase page isn't summary page
            console.log("ONLOAD availability did not work (likely not summary page)");
        }
        //proper scaling (no code here, just use correct css and such)
        console.log("ONLOAD }");
    }
}

function onScroll() {
    if (javaScript) {
        console.log("ONSCROLL {");
        var nav = $("nav");
        var button = $("menuButton");

        //if scrolled >=27px down, and menu is closed, then allow menu button to hide (if scroll is < 50 it won't appear to change yet)
        if (document.documentElement.scrollTop >= 54 && nav.style.height == "100px") {
            button.style.top = "-54px";
            button.style.position = "fixed";
            console.log("ONSCROLL } menu is closed, scroll is >= 54; menu button allowed to hide");
        }
        //else if scroll is NOT >=27px, but menu is closed, then allow menu button to reveal
        else if (nav.style.height == "100px") {
            button.style.top = "0";
            button.style.position = "absolute";
            console.log("ONSCROLL } menu is closed, scroll is NOT >= 54; menu button allowed to reveal");
        }
        //else do nothing (menu button is fixed because the menu is open)
        else {
            console.log("ONSCROLL } menu is open; menu button not changed");
        }
    }
}

//reveal menu button
function revealButton() {
    if (javaScript) {
        console.log("REVEALBUTTON {");
        var button = $("menuButton");
        buttonHidden = false;

        //if button is hidden, then reveal button
        if (button.style.top != "0px") {
            var animation = setInterval(() => {
                if (button.style.top == "0px" || buttonHidden) {
                    console.log("REVEALBUTTON } menu button revealed");
                    clearInterval(animation);
                }
                else {
                    button.style.top = trim(button.style.top) + 2 + "px";
                }
            }, 10);
        }
        else {
            console.log("REVEAL BUTTON } button not hidden, button not changed")
        }
    }
}

//hide menu button
function hideButton() {
    if (javaScript) {
        console.log("HIDEBUTTON {");
        buttonHidden = true;
        //if scroll is >= 54 and an animation isn't in progress, then hide button
        if (document.documentElement.scrollTop >= 54 && available == 0) {
            var button = $("menuButton");
            var animation = setInterval(() => {
                if (button.style.top == "-54px" || !buttonHidden) {
                    console.log("HIDEBUTTON } menu button hidden");
                    clearInterval(animation);
                }
                else {
                    button.style.top = trim(button.style.top) - 2 + "px";
                }
            }, 10);
        }
        else {
            console.log("HIDEBUTTON } scroll isnt >= 54, button not changed");
        }
    }
}

//when mouse leaves a <nav>
function testToggle() {
    if (javaScript) {
        //if nav is open and mouse has left nav area, toggle menu off (manual testing incase mouse goes over <a> tag)
        if (nav.style.height == "300px" || tNav.style.height == "300px") {
            var cX = event.clientX;
            var cY = event.clientY;
            if (cY > 308 || cX > 308 && cX < window.innerWidth - 308) {
                console.log("TESTTOGGLE { test passed, toggling menu }");
                if (nav.style.height == "300px") { toggleMenu(); }
                else { toggleTheme(); }
            }
            else {
                console.log("TESTTOGGLE { test failed, not changing menu }");
            }
        }
    }
}

//toggle main menu open or closed
function toggleMenu() {
    if (javaScript) {
        available++;
        console.log("TOGGLEMENU { available = " + available);

        if (available == 1) {
            var button = $("menuButton");
            var x = 0;
            var y = 2;
            //if closed, then open menu
            if (nav.style.height == "100px") {
                if (!buttonHidden || document.documentElement.scrollTop < 54) {
                    button.style.width = "92px";
                    button.style.zIndex = 0;
                    button.style.opacity = 1;
                    nav.style.opacity = 0;
                    var animation = setInterval(() => {
                        //if done opening, then stop opening animation
                        if (nav.style.height == "300px" || available > 1) {
                            $("1").hidden = false;
                            $("2").hidden = false;
                            $("3").hidden = false;
                            console.log("TOGGLEMENU } menu opened");
                            clearInterval(animation);
                        }
                        //else continue opening animation
                        else {
                            y -= .22;
                            nav.style.opacity = x;
                            nav.style.width = trim(nav.style.width) + 20 + "px";
                            nav.style.height = trim(nav.style.height) + 20 + "px";
                            button.style.opacity = y;
                            button.style.width = trim(button.style.width) + 20 + "px";
                            x += .22;
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
                    if (nav.style.height == "100px" || available > 1) {
                        $("1").hidden = true;
                        $("2").hidden = true;
                        $("3").hidden = true;
                        //reset button position if scroll is now at top
                        if (nav.style.height != "300px" && document.documentElement.scrollTop <= 54) {
                            button.style.top = "0";
                            button.style.position = "absolute";
                        }
                        console.log("TOGGLEMENU } menu closed");
                        clearInterval(animation);
                    }
                    //else continue closing animation
                    else {
                        y += .22;
                        nav.style.opacity = x;
                        nav.style.width = trim(nav.style.width) - 20 + "px";
                        nav.style.height = trim(nav.style.height) - 20 + "px";
                        button.style.opacity = y;
                        button.style.width = trim(button.style.width) - 20 + "px";
                        x -= .22;
                    }
                }, 10);
            }
        }
        else {
            console.log("TOGGLEMENU } toggleMenu not available; menu not changed");
        }
        available--;
    }
}

function testTheme() {
    if (javaScript) {
    }
}

//toggle theme menu open or closed
function toggleTheme() {
    if (javaScript) {
        tAvailable++;
        console.log("TOGGLETHEME {  tAvailable = " + tAvailable)
        if (tAvailable == 1) {
            var button = $("theme");
            var x = 0;
            var y = 2;
            //if closed, then open menu
            if (tNav.style.height == "100px") {
                button.style.width = "92px";
                button.style.zIndex = 0;
                button.style.opacity = 1;
                tNav.style.opacity = 0;
                var animation = setInterval(() => {
                    //if done opening, then stop opening animation
                    if (tNav.style.height == "300px") {
                        $("4").hidden = false;
                        console.log("TOGGLEMENU } theme opened");
                        clearInterval(animation);
                    }
                    //else continue opening animation
                    else {
                        y -= .22;
                        tNav.style.opacity = x;
                        tNav.style.width = trim(tNav.style.width) + 20 + "px";
                        tNav.style.height = trim(tNav.style.height) + 20 + "px";
                        button.style.opacity = y;
                        button.style.width = trim(button.style.width) + 20 + "px";
                        x += .22;
                    }
                }, 10);
            }
            //if open, then close menu
            else {
                button.style.zIndex = 4;
                var animation = setInterval(() => {
                    //if done closing, then stop closing animation
                    if (tNav.style.height == "100px") {
                        $("4").hidden = true;
                        console.log("TOGGLEMENU } theme closed");
                        clearInterval(animation);
                    }
                    //else continue closing animation
                    else {
                        y += .22;
                        tNav.style.opacity = x;
                        tNav.style.width = trim(tNav.style.width) - 20 + "px";
                        tNav.style.height = trim(tNav.style.height) - 20 + "px";
                        button.style.opacity = y;
                        button.style.width = trim(button.style.width) - 20 + "px";
                        x -= .22;
                    }//here 
                }, 10);
            }

        }
        else {
            console.log("TOGGLETHEME } toggleTheme not available, theme menu not changed")
        }
        tAvailable--;
    }
}

//highlight and expand <a>
function expand(x) {
    if (javaScript) {
        $(x).style.fontSize = "48px";
        $(x).style.color = "#b4b4b4";
        console.log("EXPAND { expanded option \"" + x + "\" }");
    }
}

//unhighlight and shrink <a>
function shrink(x) {
    if (javaScript) {
        $(x).style.fontSize = "40px";
        $(x).style.color = "black";
        console.log("SHRINK { shrank option \"" + x + "\" }");
    }
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