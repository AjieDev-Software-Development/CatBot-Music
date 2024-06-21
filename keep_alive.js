var http = require('http');

http.createServer(function (req, res) {
  res.write(`CatBot Development`) && console.log(`EXPRESS: Web execution detected`);
  res.end();
}).listen(8080); 


