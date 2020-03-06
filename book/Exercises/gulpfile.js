var gulp = require("gulp");
  var shell = require("gulp-shell");

  gulp.task("pre-install", shell.task([
        "npm i -g gulp static-server",
        "npm install -g nodemon",
        "npm install -g gulp-shell"
  ]));

  gulp.task("serve", shell.task("nodemon server.js"));

  gulp.task("lint", shell.task("jshint *.js **/*.js"));

  gulp.task("get", shell.task("curl -v http://localhost:8000/file.txt"));
  gulp.task("put", shell.task("curl -v -X PUT -d 'Bye world!' http://localhost:8000/file.txt"));
  gulp.task("del", shell.task("curl -v -X DELETE http://localhost:8000/file.txt"))
  gulp.task("dir", shell.task("curl -v -X MKCOL http://localhost:8000/directorio"))
  gulp.task("Doc", shell.task("npm run generate-docs"))


  //node module, readme.md gulpfile doc, doc, insomnia
