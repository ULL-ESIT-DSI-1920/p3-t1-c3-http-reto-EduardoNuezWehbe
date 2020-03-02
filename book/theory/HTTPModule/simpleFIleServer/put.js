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


//here we dont have to evaluate if it exist because if it does, well just overwrite it.
//we use pipe to move data from a readable stream to a writable one.
//when data is transfered successfully, pipe will close both streams.