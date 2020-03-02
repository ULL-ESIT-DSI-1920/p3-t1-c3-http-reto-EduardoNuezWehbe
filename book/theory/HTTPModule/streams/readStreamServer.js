/*
    The following code creates a server that reads request 
    bodies and streams them back to the client as all-uppercase text:
*/

var http = require("http");
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  request.on("data", function(chunk) {
    response.write(chunk.toString().toUpperCase());
  });
  request.on("end", function() {
    response.end();
  });
}).listen(8000);


//chunk variable passed to the data handler will be a binary buffer.
//we convert it to string using toString.

//this code creates a server that reads request bodies and streams
//them back to the client as all-ppercase text