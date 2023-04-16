var jaxTokens = 20;
var kaiTokens = 20;

var jax = document.getElementById("jax");

var kai = document.getElementById("kai");


function updateTokens(){
var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "tokens.txt", false);
var data = "File Error";
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                data = rawFile.responseText;
                alert(data);
            }
        }
    }
    jax.innerHTML=rawFile[1];
kai.innerHTML=data[3];
}
function jaxDown(){
jaxTokens-=1;
jax.innerHTML = jaxTokens;
}

function kaiDown(){
kaiTokens-=1;
kai.innerHTML = kaiTokens;
}
