var jaxTokens = 20;
var kaiTokens = 20;

var jax = document.getElementById("jax");

var kai = document.getElementById("kai");


function updateTokens(){
const xhr = new XMLHttpRequest();
xhr.open("GET", "tokens.txt");
xhr.send();
xhr.responseType = "json";

kai.innerHTML = "nipe";

xhr.onload = () => {
  jax.innerHTML = xhr.response;
kai.innerHTML = "hi";
};
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
