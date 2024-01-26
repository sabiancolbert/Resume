var podMode = 0;
var podRunning = false;

function expandPod(){
podMode = -1;
  if(!podRunning){
    animatePod();
  }
}

function animatePod() {
  podRunning = true;
  let id = null;
  const pod = document.getElementById("podButton");
  let podPos = pod.style.top.split('v')[0];
  let podSize = pod.style.width.split('v')[0];
  clearMode(id);
  id = setMode(frame, 10);
  function frame() {
    if (podPos <= 0.1 || podPos >= 4.5) {
      podRunning = false;
      clearMode(id);
    } else {
      podPos += podMode * .45;
      podPos += podMode * .45;
      pod.style.top = podPos + "vmin"; 
      pod.style.left = podPos + "vmin"; 
      pod.style.width = podSize + "vmin";
      pod.style.height = podSize + "vmin";
    }
  }
}
