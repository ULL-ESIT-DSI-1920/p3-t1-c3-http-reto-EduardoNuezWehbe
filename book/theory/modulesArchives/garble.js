
//Defines a library for garbling strings wich can be used both by the command-line tool

module.exports = function(string) {
    return string.split("").map(function(ch) {
      return String.fromCharCode(ch.charCodeAt(0) + 5);
    }).join("");
  };
//module.exports allow us to export a specific value from a module.
//we make result of requiring our garble file the garbling function itself


//the function split the string it is given into sigle characters by spliting on the
//empty string and then replace each character with the character whose code is five points higher