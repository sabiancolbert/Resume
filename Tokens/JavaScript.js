var jaxTokens = 20;
var kaiTokens = 20;

var jax = document.getElementById("jax");

var kai = document.getElementById("kai");


function updateTokens(){
const xhr = new XMLHttpRequest();
xhr.open("GET", "tokens.txt");
xhr.send();
xhr.responseType = "json";
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    const data = xhr.response;
    console.log(data);
jax.innerHTML = data;
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};
}


function jaxUp(int x){
jaxTokens+=x;
jax.innerHTML = jaxTokens;
}

function kaiUp(int x){
kaiTokens+=x;
kai.innerHTML = kaiTokens;
}
function jaxDown(int x){
jaxTokens-=x;
jax.innerHTML = jaxTokens;
}

function kaiDown(int x){
kaiTokens-=x;
kai.innerHTML = kaiTokens;
}
