var fs          = require('fs'),
    path        = require('path'),
    express     = require('express'),
    ecstatic    = require('ecstatic'),
    browserify  = require('browserify'),
    shell       = require('shelljs');

var server      = express(),
    builder     = browserify('./src/entry.js', {
                  debug: true
                });

/* Create directories for output */
shell.mkdir('-p', 'dist/css');


builder.plugin('watchify');
builder.plugin("modular-css/browserify", {
    css   : "dist/css/site.css",
    after : [
        require("postcss-import")
    ]
});

builder.on('update', bundle);
bundle();

function bundle() {

  var write = fs.writeFileSync;

  builder.bundle(function(err, output) {

    if(err) console.log(err);

    write('./dist/bundle.js', output);
    console.log('Bundle written!');
  });
}

server.use(ecstatic({
  root: './',
  defaultExt: 'html'
}));

server.listen(8080);

console.log('server listening at :8080');
