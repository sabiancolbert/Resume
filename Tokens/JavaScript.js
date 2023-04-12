var jaxTokens =
2
;
var kaiTokens =
2
;

var jax = document.getElementById("jax");
var kai = document.getElementById("kai");

function updateTokens(){
jax.innerHTML = jaxTokens + " Tokens";
kai.innerHTML = kaiTokens + " Tokens";
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
