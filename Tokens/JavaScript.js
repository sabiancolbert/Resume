const fs = require(“fs”);

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
jax.innerHTML ="nada";
kai.innerHTML = getTokens();
}

function updateFile(){
var data = jaxTokens + "," + kaiTokens;
fs.writeFile("tokens.txt", data, (err) => {
  if (err) console.log(err);
});
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
fs.readFile("tokens.txt", function(err, buf) {
  return buf;
});
  }



/*
function getTokensssss() {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "tokens.txt", false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}
*/
