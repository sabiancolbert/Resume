function c(c){
  console.log(c +" ");
}
var sizingPage=false;

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
      if (width * 2 < height) {
        top = height / 2 + "px";
        right = 0;
        bottom = height / 2 + "px";
        left = 0;
      } else {
        top = height / 2 + "px";
        right = width / 2 + "px";
        bottom = height / 2 + "px";
        left = width / 2 + "px";
      }
    }
    /* Landscape */
    else {
      if (height * 2 < width) {
        top = 0;
        right = width / 2 + "px";
        bottom = 0;
        left = width / 2 + "px";
      } else {
        top = height / 2 + "px";
        right = width / 2 + "px";
        bottom = height / 2 + "px";
        left = width / 2 + "px";
      }
    }
    /* Set Css */
    buttons.style.top = top;
    buttons.style.left = left;
    words.style.bottom = bottom;
    words.style.right = right;
    sizingPage = false;
  }
}
