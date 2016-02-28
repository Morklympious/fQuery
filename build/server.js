var fs          = require('fs'),
    path        = require('path'),
    express     = require('express'),
    ecstatic    = require('ecstatic'),
    browserify  = require('browserify');

var server      = express(),
    builder     = browserify('src/index.js', {
                  debug: true
                });


builder.plugin('watchify');
builder.plugin("modular-css", {
    css   : "dist/css/site.css",
    after : [
        require("postcss-import")
    ]
});

builder.on('update', bundle);
bundle();

function bundle() {
  builder.bundle(function(err, out) {

    if(err) console.log(err);

    var write = fs.writeFileSync,
        join  = path.join,


    write(join(__dirname, '../dist/bundle.js'), output);

    console.log('Bundle written!');
  });
}

server.use(ecstatic({
  root: path.join(__dirname, '../'),
  defaultExt: 'html'
}));

server.listen(8080);

console.log('server listening at :8080');
