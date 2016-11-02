var node   = require("./js/element"),
    dom    = require("./js/dom"),
    markup = require("./js/markup");


global._f = module.exports = {
  query  : dom.query,
  dom    : dom,
  node   : node,
  markup : markup
};

