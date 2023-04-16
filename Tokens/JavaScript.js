var jaxTokens = 0;
var kaiTokens = 0;

var jax = document.getElementById("jax");

var kai = document.getElementById("kai");


function updateTokens(){






  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      jaxTokens =
      this.responseText.split(",")[1];
      kaiTokens=
      this.responseText.split(",")[3];
      jax.innerHTML = jaxTokens;
      kai.innerHTML = kaiTokens;
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
