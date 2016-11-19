import element from "./js/element";
import dom     from "./js/dom";
import markup  from "./js/markup";


require("./js/polyfills/polyfills");

global._f = module.exports = {
  query   : dom.query,
  dom     : dom,
  element : element,
  markup  : markup
};

