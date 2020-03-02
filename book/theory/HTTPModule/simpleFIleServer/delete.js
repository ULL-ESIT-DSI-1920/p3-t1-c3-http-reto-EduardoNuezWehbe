//stats object retuned by fs.stat tell us a number of things about a file such as its size
//modification date. we got isDirectory for verify is it is a file or directory

//we use fs.readdir to read the list of files in a directory and, in yet another callback
//return it to the user.

//for normal files we use fs.createReadStream.

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

  //when the file is nonexistent, returns 204 because the file that is being
  //deleted is not there.

  function respondErrorOrNothing(respond) {
    return function(error) {
      if (error)
        respond(500, error.toString());
      else
        respond(204);
    };
  }