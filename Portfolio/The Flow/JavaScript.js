function c(c) {
  console.log(c +" ");
}
var sizingPage = false;

function resize() {
  c("resize()");
  if (!sizingPage) {
    c("sizing");
    sizingPage = true;
    var words = document.getElementById("words");
    var buttons = document.getElementById("buttons");
    var bodyimg = document.getElementById("bodyimg");
    var info = document.getElementById("infoBox");
    var buttonBox = document.getElementById("buttonBox");
    var body = document.getElementById("body");
    var body = document.getElementById("body");
    var body = document.getElementById("body");
    var width = window.innerWidth;
    var height = window.innerHeight;
    var top = 0;
    var right = 0;
    var bottom = 0;
    var left = 0;
    /* Portrait */
    if (width < height) {
      words.style.bottom = "40%";
      words.style.right = 0;
      buttons.style.top = "60%";
      buttons.style.left = 0;
      buttonBox.style.height = "50vw";
    }
    /* Landscape */
    else {
      words.style.bottom = 0;
      words.style.right = "40%";
      buttons.style.top = 0;
      buttons.style.left = "60%";
    }
    sizingPage = false;
  }
}