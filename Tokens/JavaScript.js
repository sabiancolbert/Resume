var jaxTokens =
2
;
var kaiTokens =
2
;

var jax = document.getElementById("jax");
var kai = document.getElementById("kai");

function updateTokens(){/*
jax.innerHTML = jaxTokens + " Tokens";
kai.innerHTML = kaiTokens + " Tokens";
*/
jax.innerHTML ="Nope";
kai.innerHTML = getTokens();
}

function jaxUp(){
jaxTokens+=1;
updateTokens();
}

function jaxDown(){
jaxTokens-=1;
updateTokens();
}

function kaiUp(){
kaiTokens+=1;
updateTokens();
}

function kaiDown(){
kaiTokens-=1;
updateTokens();
}

function getTokens() {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "tokens.txt", false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}
