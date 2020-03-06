/**
 * creating http and fs object.
 */
/**
 * @param {} http has the module http
 * @param {} fs has the module fs
 * @param {} methods is an empty object 
 */
var http = require("http"), fs = require("fs");
var methods = Object.create(null); //will store the functions that handle the various HTTP methods

/**
 * @param {string} request variable that is waiting for a request of the client
 * @param {string} response variable that is waiting for give a reponse to the clients request
 */
http.createServer(function(request, response) {
  function respond(code, body, type) {
    if (!type) type = "text/plain";
    response.writeHead(code, {"Content-Type": type});
    if (body && body.pipe)
      body.pipe(response);
    else
      response.end(body);
  }
  if (request.method in methods) //request.method es el tipo de peticion
    methods[request.method](urlToPath(request.url),
                            respond, request);
  else
    respond(405, "Method " + request.method +
            " not allowed.");
}).listen(8000);


/**
 * funtion to retunr a path
 * @param {String} url convert url to path
 */
function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  return "." + decodeURIComponent(path);
}
/**
 * we evaluate if the argv received is a GET, if it is, we will show what do we have on
 * our actual directory of the server
 *
 */
methods.GET = function(path, respond) {
  fs.stat(path, function(error, stats) {
    if (error && error.code == "ENOENT")
      respond(404, "File not found");
    else if (error)
      respond(500, error.toString());
    else if (stats.isDirectory())
      fs.readdir(path, function(error, files) {
        if (error)
          respond(500, error.toString());
        else
          respond(200, files.join("\n"));
      });
    else
      respond(200, fs.createReadStream(path),
              require("mime").lookup(path));
  });
};
/**
 * Removes a file with a specific path
 * @param {String} pathfile or directory to delete
 * @param {string} respond us with an error message or nothing
 * @param {string} stats evaluate if is a file or directory
 */
methods.DELETE = function(path, respond) {
  fs.stat(path, function(error, stats) {
    if (error && error.code == "ENOENT")
      respond(204);
    else if (error)
      respond(500, error.toString());
    else if (stats.isDirectory())
      fs.rmdir(path, respondErrorOrNothing(respond));
    else
      fs.unlink(path, respondErrorOrNothing(respond));
  });
};

/**
 * 
 * controls if an exception appear
 * @param {string} respond return an error or end of function
 */
function respondErrorOrNothing(respond) {
  return function(error) {
    if (error)
      respond(500, error.toString());
    else
      respond(204);
  };
}
/**
 * write in the path received on argv. If it has information, clean it and write
 * @param {String} path file to overwrite 
 * @param {String} outStream new text for the file
 */
methods.PUT = function(path, respond, request) {
  var outStream = fs.createWriteStream(path);
  outStream.on("error", function(error) {
    respond(500, error.toString());
  });
  outStream.on("finish", function() {
    respond(204);
  });
  request.pipe(outStream);
};
/**
 * create a new directory on the server path.
 * @param {String} path name of our new directory
 */
methods.MKCOL = function(path,respond) {
  
  fs.mkdir(path, function(err){
    if(err){
        console.log("failed to create director");
        respond(400);
    }else{
        console.log("Directory created successfully");
        respond(204);
    }
});
};
//respond function is passed to the functios that handle various methods and
//acts as callback to finish the request. It takes an http status code, a body,
//and optionally a content type as arguments. If value passed as the body is a readable stream,
//it will have a pipe method, wich is used to forward a readable stream to a 
//writeable stream. If not, it assumed to be either null.
