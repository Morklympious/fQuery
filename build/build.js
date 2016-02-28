var fs         = require('fs'),
    path       = require('path'),
    browserify = require('browserify');

var build = browserify("./src/entry.js");

build.plugin("modular-css", {

    // Output CSS file with all of your fancy scoped classes.
    css : "./dist/css/site.css",

    // Handle @import
    after : [ require("postcss-import") ],

    // Source maps? Yes please!
    map : true
});

build.bundle(function(err, output) {

  if(err) console.log(err);

  var write = fs.writeFileSync,
      join  = path.join;


  write(join(__dirname, '../dist/bundle.js'), output);
});
