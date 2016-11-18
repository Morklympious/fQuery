var element = require("./js/element"),
    dom     = require("./js/dom"),
    markup  = require("./js/markup");

require("./js/polyfills/polyfills");

global._f = module.exports = {
  query   : dom.query,
  dom     : dom,
  element : element,
  markup  : markup
};

