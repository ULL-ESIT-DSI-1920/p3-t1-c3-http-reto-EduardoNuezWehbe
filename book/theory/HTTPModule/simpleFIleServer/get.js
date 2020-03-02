// We will set up the GET method to return a list of files when reading 
//a directory and to return the file’s content when reading a regular file.

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


//When a requested file does not exist, the correct HTTP error code to return is 404. 
//We will use fs.stat, which looks up information on a file, to find out both whether the 
//file exists and whether it is a directory.

//when file does not eist, fs.stat pass an error object with ENOENT
//to its callback.

//We are going to report any errors we didn’t expect with status code 500, which indicates 
//that the problem exists in the server, as opposed to codes starting with 4
