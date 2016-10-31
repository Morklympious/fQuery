var node      = require("./js/lib/functional-node"),
    dom  = require("./js/lib/functional-dom"),
    markup    = require("./js/lib/functional-markup");


global._f = module.exports = {
  query  : dom.query,
  dom    : dom,
  node   : node,
  markup : markup
};

