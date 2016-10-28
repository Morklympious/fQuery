var fs = require('fs'),
  browserify = require('browserify'),
  shell = require('shelljs');


var build = browserify("./src/entry.js", {
  debug: true
});

/* Create directories for output */
shell.mkdir('-p', 'dist');

build.bundle(function(err, output) {
  var write = fs.writeFileSync;

  if (err) { 
    console.log(err);
    return;
  }

  write('./dist/bundle.js', output);
  console.log('Bundle built!');
});
