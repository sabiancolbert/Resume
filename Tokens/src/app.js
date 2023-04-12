import express from 'express';
import { port } from './config/index.js';
import loader from './loaders/index.js';

const app = express();
const fs = require(“fs”);

loader(app);

app.listen(port, err => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});
function getTokens() {
return "gaph";
/*
fs.readFile("/tokens.txt", function(err, buf) {
  return buf;
});*/
  }

function updateFile(jax, kai){
var data = jax + "," + kai;
fs.writeFile("/tokens.txt", data, (err) => {
  if (err) console.log(err);
});
}


export default app
