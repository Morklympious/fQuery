var polyfills = require("./js/polyfills/polyfills"),
    node      = require("./js/lib/functional-nodes"),
    traversal = require("./js/lib/functional-traversal");

// if(!Array.prototype.indexOf) {
//   polyfills.initialize.indexOf();
// }

// if(!Element.prototype.matches) {
//   polyfills.initialize.matches();
// }

global._f = module.exports = {
  traversal: traversal,
  node: node
};

