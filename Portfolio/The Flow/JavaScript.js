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
      buttons.style.top = "calc(100vh - 100vw)";
      buttons.style.left = 0;
      document.getElementById("body").style.left="25vw";
    }
    /* Landscape */
    else {
      words.style.bottom = 0;
      words.style.right = "100vw";
      buttons.style.top = 0;
      buttons.style.left = "calc(100vw-100vh)";
      document.getElementById("body").style.left="25vh";
      }
    sizingPage = false;
  }
}