var fs         = require('fs'),
    browserify = require('browserify'),
    shell      = require('shelljs');


var build = browserify("./src/entry.js", {
  debug: true
});

/* Create directories for output */
shell.mkdir('-p', 'dist/css');

build.plugin("modular-css/browserify", {

    // Output CSS file with all of your fancy scoped classes.
    css : "./dist/css/site.css",

    map: true
});

build.bundle(function(err, output) {
  var write = fs.writeFileSync;

  if(err) console.log(err);
  write('./dist/bundle.js', output);
});
