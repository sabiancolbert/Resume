var http = require('http')
var fs = require('fs')

const PORT = 8080

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><body><p>worked</p></body></html>');
res.end('Hello World!');
}).listen(8080);
