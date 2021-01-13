function $($) { return document.getElementById($); }

function onLoad() {//set age for summary page
    var date = new Date();
    var age = date.getFullYear() - 2001;
    if (date.getMonth() > 4 && date.getDate() > 1) {
        age++;
    }
    try {//here css;      div a:hover{}
        console.log("ONLOAD age = " + age);
        $("age").innerText = "I am a " + age + " year old father of two with high functioning autism and a progresss driven mind";
    }
    catch {
        //incase page isn't summary page
        console.log("ONLOAD age did not work (likely not summary page)");
    }

    //set availability for summary page
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
        $("availability").innerText = x;
    }
    catch {
        //incase page isn't summary page
    }
}

function themeToggle() {
    window.open("../themes.html", "_self");
}