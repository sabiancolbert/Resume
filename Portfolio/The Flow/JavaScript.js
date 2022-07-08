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
    var body = document.getElementById("body");
    var width = window.innerWidth;
    var height = window.innerHeight;
    var top = 0;
    var right = 0;
    var bottom = 0;
    var left = 0;
    /* Portrait */
    if (width < height) {
      words.style.bottom = "100vw";
      words.style.right = 0;
      buttons.style.top = "45%";
      buttons.style.left = 0;
      bodyimg.style.right = "25vw";
      info.style.maxHeight = "85%";
      body.style.minHeight = "200vmin";
      body.style.minWidth = null;
    }
    /* Landscape */
    else {
      words.style.bottom = 0;
      words.style.right = "100vh";
      buttons.style.top = 0;
      buttons.style.left = "calc(100vw-100vh)";
      bodyimg.style.right = "25vh";
      info.style.maxHeight = "65vh";
      body.style.minHeight = null;
      body.style.minWidth = "200vh";
    }
    sizingPage = false;
  }
}