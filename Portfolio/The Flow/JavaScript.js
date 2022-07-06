
function resizePageElements() {
  c("resizePageElements()");
  if (!sizingPage) {
    sizingPage = true;
    var root = document.getElementsByTagName("html")[0];
    //gridBox = document.getElementById("gridBox");
    var width = window.innerWidth;
    var height = window.innerHeight;
    var buttonBox = document.getElementById("buttonBox");
    gridBox = document.getElementById("gridBox");
    var top = 0;
    var right = 0;
    var bottom = 0;
    var left = 0;
    /* Portrait */
    if (width < height) {
      if (width * 2 < height) {
        top = (height - width) + "px";
        right = 0;
        bottom = (height - width) + "px";
        left = 0;
        root.style.fontSize = width / 17 + "px";
      } else {
        top = height / 2 + "px";
        right = width - (height / 2) + "px";
        bottom = height / 2 + "px";
        left = width - (height / 2) + "px";
        root.style.fontSize = height / 2 / 17 + "px";
      }
    }
    /* Landscape */
    else {
      if (height * 2 < width) {
        top = 0;
        right = (width - height) + "px";
        bottom = 0;
        left = (width - height) + "px";
        root.style.fontSize = height / 17 + "px";
      } else {
        top = height - (width / 2) + "px";
        right = width / 2 + "px";
        bottom = height - (width / 2) + "px";
        left = width / 2 + "px";
        root.style.fontSize = width / 2 / 17 + "px";
      }
    }
    /* Set Css */
    gridBox.style.bottom = bottom;
    gridBox.style.right = right;
    buttonBox.style.top = top;
    buttonBox.style.left = left;
    sizingPage = false;
  }
}
