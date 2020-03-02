var http = require("http");
var server = http.createServer(function(request, response) { 
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Hello!</h1><p>You asked for <code>" +
                 request.url + "</code></p>");
  response.end();
});
server.listen(8000);

//we write node basicServer.js and go to: http://localhost:8000/(what you want)
//it will print hello! as header, and our section selected after /*

/*create server is called every time a client tries to connect to the server
  the request and respones are variables objects representing the incoming and outgoing data
  The first contains information about request such as its url properly wich tell us what 
  URL the request was made  
  To send something back we use call methods. The first writeHead will write out the response headers 
  You give it the status code (200 for “OK” in this case) and an object that contains header values. 
  Here we tell the client that we will be sending back an HTML document.
  Next, the actual response body (the document itself) is sent with response.write.

  The call to server.listen causes the server to start waiting for connections on port 8000.
    
*/
