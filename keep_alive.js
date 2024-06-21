var http = require('http');

http.createServer(function (req, res) {
  res.write(`CatBot Music Development`) && console.log(`EXPRESS: Web Execution Detected`);
  res.end();
}).listen(14212); 


