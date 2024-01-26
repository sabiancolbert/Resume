var podMode = 0;
var podRunning = false;

var test = document.getElemendById("test");



function expandPod(){
    test.innerHTML = 1;
podMode = -1;
  if(!podRunning){
    test.innerHTML = 2;
    animatePod();
  }
}

function animatePod() {
    test.innerHTML = 3;
  podRunning = true;
  let id = null;
  const pod = document.getElementById("podButton");
  let podPos = pod.style.top.split('v')[0];
  let podSize = pod.style.width.split('v')[0];
  clearMode(id);
  id = setMode(frame, 10);
    test.innerHTML = 4;
  function frame() {
    if (podPos <= 0.1 || podPos >= 4.5) {
    test.innerHTML = 6;
      podRunning = false;
      clearMode(id);
    } else {
    test.innerHTML = 5;
      podPos += podMode * .45;
      podPos += podMode * .45;
      pod.style.top = podPos + "vmin"; 
      pod.style.left = podPos + "vmin"; 
      pod.style.width = podSize + "vmin";
      pod.style.height = podSize + "vmin";
    }
  }
}
