var _elements = require("./internal/helpers").elements;

// Find a nested element
function find(element, selector) {
  return _elements(element.querySelectorAll(selector));
}

function query(selector) {
  return find(document.body, selector);
}

// find the closest element that matches (includes self)
function closest(element, selector) {
  var current = element; 

  // If the node has a .matches function, we're still in 
  // the DOM. If not, we reached the document object. 
  while(current.matches && !current.matches(selector)) {
    current = parent(current);
  }

  return !(current === document) ? current : false;
}

// Return node parent
function parent(element) {
  return element.parentNode;
}

// Get immediate children
function children(element) {
  return _elements(element.childNodes);
}

function siblings(element, selector) {
  return selector ? find(parent(element), selector) : children(parent(element));
}

// Possible additions: .next(), .previous(). 

module.exports = {
  query    : query, 
  find     : find,
  closest  : closest,
  parent   : parent,
  children : children,
  siblings : siblings
};
