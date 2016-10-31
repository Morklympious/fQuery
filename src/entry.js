var node      = require("./js/lib/functional-nodes"),
    dom  = require("./js/lib/functional-traverse"),
    markup    = require("./js/lib/functional-markup");


global._f = module.exports = {
  query  : dom.query,
  dom    : dom,
  node   : node,
  markup : markup
};

