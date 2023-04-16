var jaxTokens = 0;
var kaiTokens = 0;

var jax = document.getElementById("jax");

var kai = document.getElementById("kai");


function updateTokens(){






  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      jaxTokens =
      parseInt(this.responseText.split("-")[2]);
      kaiTokens=
      parseInt(this.responseText.split("-")[4]);
      jax.innerHTML = jaxTokens + " Tokens";
      kai.innerHTML = kaiTokens + " Tokens";
    }
  };
  xhttp.open("GET", "tokens.txt", true);
  xhttp.send();





}


function jaxUp(x){
jaxTokens+=x;
jax.innerHTML = jaxTokens + " Tokens";
}

function kaiUp(x){
kaiTokens+=x;
kai.innerHTML = kaiTokens + " Tokens";
}
function jaxDown(x){
jaxTokens-=x;
jax.innerHTML = jaxTokens  + " Tokens";
}

function kaiDown(x){
kaiTokens-=x;
kai.innerHTML = kaiTokens  + " Tokens";
}
