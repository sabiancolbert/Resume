var jaxTokens = 30;
var kaiTokens = 30;

var jax = document.getElementById("jax");

var kai = document.getElementById("kai");


function updateTokens(){






  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      jax.innerHTML =
      this.responseText[1];
      kai.innerHTML=this.responseText[3];
    }
  };
  xhttp.open("GET", "tokens.txt", true);
  xhttp.send();





}


function jaxUp(x){
jaxTokens+=x;
jax.innerHTML = jaxTokens;
}

function kaiUp(x){
kaiTokens+=x;
kai.innerHTML = kaiTokens;
}
function jaxDown(x){
jaxTokens-=x;
jax.innerHTML = jaxTokens;
}

function kaiDown(x){
kaiTokens-=x;
kai.innerHTML = kaiTokens;
}
