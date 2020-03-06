var http = require("http");
var request = http.request({
  hostname: "eloquentjavascript.net",
  path: "/20_node.html",
  method: "GET",
  headers: {Accept: "text/html"}
}, function(response) {
  console.log("Server responded with status code",
              response.statusCode);
});
request.end();


/*
  response object we saw in the server, the object returned by request allows us to stream data into 
  the request with the write method and finish the request with the end method. 
  The example does not use write because GET requests should not contain data in their request body.  
*/
