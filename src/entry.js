var example = require('./js/example');

/*
  We require global CSS here without assigning because
  it allows browserify to run the 'modular-css' plugin
  which outputs a file that we link to through our site
*/
require('./css/global.css');

// Assign example to the global namespace so you can
// see that it works.
global.example = example;
example.write('Writing in the console.')
